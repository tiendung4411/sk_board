tsParticles.load("tsparticles", {
    backgroundMode: {
        enable: true
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 0
        },
        collisions: {
            enable: false
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: false,
            animation: {
                enable: false,
                speed: 1,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: 30,
            random: {
                enable: true,
                minimumValue: 15
            },
            animation: {
                enable: false,
                speed: 40,
                minimumValue: 0.1,
                sync: false
            }
        },
        links: {
            enable: false
        },
        life: {
            duration: {
                sync: true,
                value: 5
            },
            count: 1
        },
        move: {
            enable: true,
            gravity: {
                enable: true
            },
            speed: 10,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
                bottom: "bounce",
                default: "destroy",
                top: "none"
            },
            trail: {
                enable: true,
                fillColor: "#000000",
                length: 10
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onHover: {
                enable: false,
                mode: "repulse",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10
                }
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8
            },
            repulse: {
                distance: 200
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    detectRetina: true,
    background: {
        color: "#000"
    },
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 5,
            delay: 2
        },
        rate: {
            delay: 0.1,
            quantity: 1
        },
        size: {
            width: 0,
            height: 0
        },
        particles: {
            bounce: {
                vertical: {
                    value: 0.8,
                    random: {
                        enable: true,
                        minimValue: 0.4
                    }
                }
            },
            color: {
                value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
            },
            links: {
                enable: false
            },
            opacity: {
                value: 0.5
            },
            move: {
                speed: 15,
                random: false
            }
        }
    }
});
