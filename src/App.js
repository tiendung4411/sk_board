import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Confetti from 'react-confetti';

import RedBackground from './components/RedBackground';
import NumberContainer from './components/NumberContainer';
import FountainBackground from './components/FountainBackground';
import logo from './components/LOGOWEB.png';
// Initialize socket connection
const socket = io('https://sk-backend-9yec.onrender.com'); // Replace with your server's URL
const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [round, setRound] = useState({});
  const [numbers, setNumbers] = useState([]);
  const [animateNumber, setAnimateNumber] = useState(false);
  const [bingoNumbers, setBingoNumbers] = useState([]);

  // Store timeout ID for clearing later
  const confettiTimeoutRef = useRef(null);

  // Effect to listen for the 'congratulationAnimationTriggered' event
  useEffect(() => {
    socket.on('congratulationAnimationTriggered', () => {
      setShowConfetti(true); // Start confetti animation
      console.log('Show confetti');

      // Clear any previous timeouts
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }

      // Set a new timeout to stop the confetti after 25 seconds (or any duration you want)
      confettiTimeoutRef.current = setTimeout(() => {
        setShowConfetti(false); // Stop confetti after 25 seconds
      }, 25000);  // 25000ms = 25 seconds
    });

    // Cleanup on unmount or when the event listener is removed
    return () => {
      socket.off('congratulationAnimationTriggered');
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current); // Clear timeout on cleanup
      }
    };
  }, []);

  // Fetch the active round from the backend when the app loads
  useEffect(() => {
    const fetchActiveRound = async () => {
      try {
        const response = await axios.get('https://sk-backend-9yec.onrender.com/api/rounds/active');
        setRound(response.data.data);
        setNumbers(response.data.data.calledNumbers || []);
        setBingoNumbers(response.data.data.bingoNumbers || []);
        console.log('Active round:', response.data.data);
      } catch (error) {
        console.error('Error fetching active round:', error);
      }
    };

    fetchActiveRound();
  }, []);

  // Listen for round started and number added
  useEffect(() => {
    socket.on('roundStarted', (updatedRound) => {
      console.log("Round started:", updatedRound);
      setRound(updatedRound);
      setNumbers(updatedRound.calledNumbers || []);
      setBingoNumbers(updatedRound.bingoNumbers || []);
    });

    socket.on('numberAdded', (updatedRound) => {
      console.log("Number added:", updatedRound);
      setRound(updatedRound);
      setNumbers(updatedRound.calledNumbers);
      setBingoNumbers(updatedRound.bingoNumbers);
      setAnimateNumber(true);  // Trigger animation
      setTimeout(() => setAnimateNumber(false), 500);  // Reset animation state after 500ms
    });

    socket.on('bingoNumberUpdated', (updatedRound) => {
      setRound(updatedRound);
      setBingoNumbers(updatedRound.bingoNumbers);
    });
    socket.on('roundStarted', (updatedRound) => {
      console.log('Round started:', updatedRound);
      setRound(updatedRound);
      setNumbers(updatedRound.calledNumbers || []);
      setBingoNumbers(updatedRound.bingoNumbers || []);
    });
    return () => {
      socket.off('roundStarted');
      socket.off('numberAdded');
      socket.off('bingoNumberUpdated');
    };
  }, []);

  // Ensure `roundColor` is a number
  const roundColor = parseInt(round.roundColor, 10) || 1;

  return (
    <div style={{ position: 'relative' }}>
      {/* Pass the roundColor as prop to RedBackground */}
      <RedBackground roundColor={roundColor} />
      {/* <FountainBackground roundColor={roundColor} /> */}
      <div style={{ backgroundSize: 'cover', height: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', position: 'relative', zIndex: 1 }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Distribute space between elements
            padding: '0px 35px', // Adjust padding for spacing
          }}
        >
          <h1 style={{ fontSize: '74px', marginTop: 'auto', marginBottom: '10px' }}>
            Vòng loại: {round.roundId}
          </h1>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '220px',
              height: 'auto',
              marginLeft: 'auto',
            }}
          />
        </header>
        <main style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <NumberContainer numbers={numbers} bingoNumbers={bingoNumbers} animateNumber={animateNumber} />
        </main>
        <footer style={{ padding: '20px', textAlign: 'center' }} />
      </div>

      {showConfetti && <Confetti />}
    </div>
  );
};

export default App;
