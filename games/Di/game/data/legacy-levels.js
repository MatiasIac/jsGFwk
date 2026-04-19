export const LEGACY_LEVEL_SOURCE = "games/Di/game/data/legacy-levels.js (ZX-native)";

// ZX-native level schema:
// - Coordinates and sizes are already in 256x192 pixel space.
// - platforms and exits are collision rectangles.
// - enemies groups enemy start definitions by type.
// - legacy adapter in game/level-port.js still accepts old keys for compatibility.
export const LEGACY_LEVELS = [
  {
    index: 0,
    startingPoint: {
      x: 32,
      y: 48
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 192
      },
      {
        x: 0,
        y: 16,
        width: 112,
        height: 32
      },
      {
        x: 96,
        y: 0,
        width: 16,
        height: 112
      },
      {
        x: 16,
        y: 176,
        width: 176,
        height: 16
      },
      {
        x: 192,
        y: 176,
        width: 64,
        height: 16
      },
      {
        x: 96,
        y: 96,
        width: 160,
        height: 16
      },
      {
        x: 240,
        y: 96,
        width: 16,
        height: 96
      },
      {
        x: 224,
        y: 128,
        width: 32,
        height: 16
      },
      {
        x: 0,
        y: 48,
        width: 32,
        height: 16
      },
      {
        x: 80,
        y: 80,
        width: 32,
        height: 16
      },
      {
        x: 0,
        y: 112,
        width: 32,
        height: 16
      }
    ],
    enemies: {
      spikes: [
        {
          x: 48,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 64,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.7
        },
        {
          x: 96,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.2
        },
        {
          x: 112,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.1
        },
        {
          x: 144,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        }
      ],
      bats: [
        {
          x: 32,
          y: 96,
          axis: 'vertical',
          range: 41,
          speed: 0.02,
          direction: 1
        },
        {
          x: 64,
          y: 80,
          axis: 'vertical',
          range: 41,
          speed: 0.01,
          direction: 1
        }
      ],
      fallingWalls: [
        {
          x: 96,
          y: 96,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 128,
          y: 96,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 144,
          y: 96,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        }
      ],
      saws: []
    },
    exits: [
      {
        x: 0,
        y: 176,
        width: 32,
        height: 16,
        id: 'exit-0-0',
        goTo: 1,
        type: 'door',
        showsAt: {
          x: 16,
          y: 0
        }
      },
      {
        x: 176,
        y: 176,
        width: 32,
        height: 16,
        id: 'exit-0-1',
        goTo: 1,
        type: 'door',
        showsAt: {
          x: 192,
          y: 0
        }
      }
    ],
    item: {
      x: 16,
      y: 32,
      width: 16,
      height: 32,
      item: 2
    }
  },
  {
    index: 1,
    startingPoint: {
      x: 48,
      y: 32
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 192
      },
      {
        x: 0,
        y: 176,
        width: 256,
        height: 16
      },
      {
        x: 16,
        y: 0,
        width: 176,
        height: 16
      },
      {
        x: 192,
        y: 0,
        width: 64,
        height: 16
      },
      {
        x: 32,
        y: 0,
        width: 32,
        height: 144
      },
      {
        x: 32,
        y: 144,
        width: 224,
        height: 16
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 80
      },
      {
        x: 240,
        y: 96,
        width: 16,
        height: 48
      },
      {
        x: 112,
        y: 48,
        width: 96,
        height: 16
      },
      {
        x: 240,
        y: 144,
        width: 16,
        height: 48
      },
      {
        x: 96,
        y: 96,
        width: 64,
        height: 16
      }
    ],
    enemies: {
      spikes: [
        {
          x: 48,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 48,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.6
        },
        {
          x: 64,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.7
        },
        {
          x: 80,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.8
        },
        {
          x: 96,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.9
        },
        {
          x: 96,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 2
        },
        {
          x: 112,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 2.1
        }
      ],
      bats: [
        {
          x: 160,
          y: 160,
          axis: 'horizontal',
          range: 41,
          speed: 0.02,
          direction: 1
        },
        {
          x: 128,
          y: 32,
          axis: 'horizontal',
          range: 61,
          speed: 0.02,
          direction: 1
        }
      ],
      fallingWalls: [
        {
          x: 96,
          y: 96,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 112,
          y: 48,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 128,
          y: 48,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 160,
          y: 48,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        }
      ],
      saws: [
        {
          x: 0,
          y: 32,
          width: 32,
          height: 16,
          motion: 'linear',
          center: {
            x: 0,
            y: 32
          },
          range: 1,
          speed: 0
        },
        {
          x: 16,
          y: 64,
          width: 32,
          height: 32,
          motion: 'linear',
          center: {
            x: 16,
            y: 64
          },
          range: 1,
          speed: 0
        },
        {
          x: 0,
          y: 96,
          width: 32,
          height: 32,
          motion: 'linear',
          center: {
            x: 0,
            y: 96
          },
          range: 1,
          speed: 0
        }
      ]
    },
    exits: [
      {
        x: 0,
        y: 0,
        width: 32,
        height: 16,
        id: 'exit-1-0',
        goTo: 0,
        type: 'door',
        showsAt: {
          x: 16,
          y: 176
        }
      },
      {
        x: 176,
        y: 0,
        width: 32,
        height: 16,
        id: 'exit-1-1',
        goTo: 0,
        type: 'door',
        showsAt: {
          x: 192,
          y: 176
        }
      },
      {
        x: 240,
        y: 64,
        width: 16,
        height: 32,
        id: 'exit-1-2',
        goTo: 2,
        type: 'door',
        showsAt: {
          x: 0,
          y: 80
        }
      }
    ],
    blood: [
      {
        x: 160,
        y: 32,
        isActive: true
      },
      {
        x: 16,
        y: 160,
        isActive: true
      }
    ]
  },
  {
    index: 2,
    startingPoint: {
      x: 48,
      y: 32
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 80
      },
      {
        x: 0,
        y: 96,
        width: 16,
        height: 96
      },
      {
        x: 240,
        y: 160,
        width: 16,
        height: 32
      },
      {
        x: 0,
        y: 0,
        width: 256,
        height: 16
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 144
      },
      {
        x: 48,
        y: 96,
        width: 48,
        height: 16
      },
      {
        x: 160,
        y: 48,
        width: 48,
        height: 16
      },
      {
        x: 112,
        y: 176,
        width: 48,
        height: 16
      },
      {
        x: 176,
        y: 128,
        width: 32,
        height: 16
      },
      {
        x: 0,
        y: 16,
        width: 64,
        height: 32
      }
    ],
    enemies: {
      spikes: [],
      bats: [],
      fallingWalls: [],
      saws: [
        {
          x: 48,
          y: 96,
          width: 32,
          height: 16,
          motion: 'circular',
          center: {
            x: 48,
            y: 96
          },
          radius: 41,
          speed: 0.02
        },
        {
          x: 160,
          y: 48,
          width: 32,
          height: 32,
          motion: 'circular',
          center: {
            x: 160,
            y: 48
          },
          radius: 41,
          speed: 0.03
        },
        {
          x: 176,
          y: 112,
          width: 32,
          height: 32,
          motion: 'circular',
          center: {
            x: 176,
            y: 112
          },
          radius: 28,
          speed: 0.025
        }
      ]
    },
    exits: [
      {
        x: 0,
        y: 64,
        width: 16,
        height: 32,
        id: 'exit-2-0',
        goTo: 1,
        type: 'door',
        showsAt: {
          x: 240,
          y: 80
        }
      },
      {
        x: 240,
        y: 144,
        width: 16,
        height: 32,
        id: 'exit-2-1',
        goTo: 3,
        type: 'door',
        showsAt: {
          x: 0,
          y: 144
        }
      },
      {
        x: 0,
        y: 176,
        width: 256,
        height: 16,
        id: 'exit-2-2',
        goTo: 5,
        type: 'door',
        showsAt: {
          x: 112,
          y: 0
        }
      }
    ],
    blood: [
      {
        x: 0,
        y: 0,
        isActive: true
      }
    ]
  },
  {
    index: 3,
    startingPoint: {
      x: 48,
      y: 32
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 144
      },
      {
        x: 0,
        y: 160,
        width: 16,
        height: 32
      },
      {
        x: 0,
        y: 160,
        width: 256,
        height: 32
      },
      {
        x: 224,
        y: 0,
        width: 32,
        height: 176
      },
      {
        x: 16,
        y: 0,
        width: 224,
        height: 32
      },
      {
        x: 0,
        y: 48,
        width: 48,
        height: 32
      },
      {
        x: 96,
        y: 80,
        width: 48,
        height: 32
      },
      {
        x: 192,
        y: 128,
        width: 48,
        height: 16
      },
      {
        x: 208,
        y: 144,
        width: 32,
        height: 16
      }
    ],
    enemies: {
      spikes: [
        {
          x: 16,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 32,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 48,
          y: 160,
          width: 16,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 48,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 64,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 80,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 96,
          y: 160,
          width: 16,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 96,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 112,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 128,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 144,
          y: 160,
          width: 16,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 144,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 160,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 176,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        }
      ],
      bats: [
        {
          x: 96,
          y: 128,
          axis: 'horizontal',
          range: 41,
          speed: 0.03,
          direction: 1
        }
      ],
      fallingWalls: [],
      saws: []
    },
    exits: [
      {
        x: 0,
        y: 144,
        width: 16,
        height: 32,
        id: 'exit-3-0',
        goTo: 2,
        type: 'door',
        showsAt: {
          x: 240,
          y: 144
        }
      },
      {
        x: 0,
        y: 0,
        width: 32,
        height: 16,
        id: 'exit-3-1',
        goTo: 4,
        type: 'door',
        showsAt: {
          x: 16,
          y: 176
        }
      }
    ],
    blood: [
      {
        x: 192,
        y: 144,
        isActive: true
      }
    ]
  },
  {
    index: 4,
    startingPoint: {
      x: 48,
      y: 128
    },
    platforms: [
      {
        x: 240,
        y: 32,
        width: 16,
        height: 160
      },
      {
        x: 16,
        y: 176,
        width: 240,
        height: 16
      },
      {
        x: 0,
        y: 128,
        width: 16,
        height: 64
      },
      {
        x: 0,
        y: 128,
        width: 48,
        height: 16
      },
      {
        x: 16,
        y: 112,
        width: 48,
        height: 32
      },
      {
        x: 160,
        y: 32,
        width: 96,
        height: 16
      },
      {
        x: 176,
        y: 48,
        width: 32,
        height: 64
      },
      {
        x: 48,
        y: 96,
        width: 160,
        height: 32
      },
      {
        x: 176,
        y: 128,
        width: 80,
        height: 16
      },
      {
        x: 96,
        y: 144,
        width: 48,
        height: 48
      },
      {
        x: 144,
        y: 128,
        width: 48,
        height: 16
      },
      {
        x: 192,
        y: 80,
        width: 32,
        height: 16
      }
    ],
    enemies: {
      spikes: [
        {
          x: 144,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 144,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.7
        },
        {
          x: 160,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.2
        },
        {
          x: 176,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.1
        },
        {
          x: 192,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        },
        {
          x: 192,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        },
        {
          x: 208,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        },
        {
          x: 224,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        }
      ],
      bats: [
        {
          x: 224,
          y: 80,
          axis: 'vertical',
          range: 33,
          speed: 0.02,
          direction: 1
        }
      ],
      fallingWalls: [
        {
          x: 80,
          y: 112,
          width: 16,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        }
      ],
      saws: []
    },
    exits: [
      {
        x: 0,
        y: 176,
        width: 32,
        height: 16,
        id: 'exit-4-0',
        goTo: 3,
        type: 'door',
        showsAt: {
          x: 16,
          y: 0
        }
      }
    ],
    blood: [
      {
        x: 224,
        y: 160,
        isActive: true
      }
    ],
    coffin: {
      x: 192,
      y: 64,
      width: 32,
      height: 32
    },
    stakeDoor: {
      x: 176,
      y: 112,
      width: 32,
      height: 32
    }
  },
  {
    index: 5,
    startingPoint: {
      x: 48,
      y: 32
    },
    platforms: [
      {
        x: 0,
        y: 176,
        width: 160,
        height: 16
      },
      {
        x: 0,
        y: 0,
        width: 16,
        height: 176
      },
      {
        x: 160,
        y: 160,
        width: 96,
        height: 32
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 176
      },
      {
        x: 176,
        y: 144,
        width: 80,
        height: 32
      },
      {
        x: 192,
        y: 144,
        width: 64,
        height: 16
      },
      {
        x: 192,
        y: 128,
        width: 64,
        height: 16
      },
      {
        x: 208,
        y: 112,
        width: 48,
        height: 32
      },
      {
        x: 96,
        y: 32,
        width: 48,
        height: 16
      },
      {
        x: 144,
        y: 80,
        width: 32,
        height: 16
      }
    ],
    enemies: {
      spikes: [],
      bats: [],
      fallingWalls: [],
      saws: []
    },
    exits: [
      {
        x: 0,
        y: 0,
        width: 256,
        height: 16,
        id: 'exit-5-0',
        goTo: 2,
        type: 'door',
        showsAt: {
          x: 64,
          y: 176
        }
      },
      {
        x: 0,
        y: 160,
        width: 16,
        height: 32,
        id: 'exit-5-1',
        goTo: 6,
        type: 'door',
        showsAt: {
          x: 240,
          y: 160
        }
      },
      {
        x: 144,
        y: 176,
        width: 32,
        height: 16,
        id: 'exit-5-2',
        goTo: 7,
        type: 'door',
        showsAt: {
          x: 160,
          y: 0
        }
      }
    ]
  },
  {
    index: 6,
    startingPoint: {
      x: 48,
      y: 48
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 256,
        height: 16
      },
      {
        x: 0,
        y: 176,
        width: 256,
        height: 16
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 176
      },
      {
        x: 0,
        y: 0,
        width: 16,
        height: 192
      },
      {
        x: 32,
        y: 32,
        width: 192,
        height: 16
      },
      {
        x: 32,
        y: 48,
        width: 32,
        height: 112
      },
      {
        x: 48,
        y: 144,
        width: 176,
        height: 16
      },
      {
        x: 192,
        y: 48,
        width: 32,
        height: 96
      },
      {
        x: 192,
        y: 80,
        width: 16,
        height: 16
      },
      {
        x: 224,
        y: 96,
        width: 32,
        height: 32
      },
      {
        x: 208,
        y: 48,
        width: 32,
        height: 32
      }
    ],
    enemies: {
      spikes: [
        {
          x: 48,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 64,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.7
        },
        {
          x: 96,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.2
        },
        {
          x: 112,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.1
        },
        {
          x: 144,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        },
        {
          x: 160,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        },
        {
          x: 192,
          y: 176,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.3
        }
      ],
      bats: [
        {
          x: 96,
          y: 16,
          axis: 'horizontal',
          range: 41,
          speed: 0.02,
          direction: 1
        }
      ],
      fallingWalls: [
        {
          x: 80,
          y: 48,
          width: 32,
          height: 16,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 96,
          y: 48,
          width: 32,
          height: 16,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 128,
          y: 48,
          width: 32,
          height: 16,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 144,
          y: 48,
          width: 32,
          height: 16,
          trigger: 'below',
          fallSpeed: 1.5
        }
      ],
      saws: [
        {
          x: 0,
          y: 160,
          width: 32,
          height: 32,
          motion: 'linear',
          center: {
            x: 0,
            y: 160
          },
          range: 1,
          speed: 0
        }
      ]
    },
    exits: [
      {
        x: 240,
        y: 160,
        width: 16,
        height: 32,
        id: 'exit-6-0',
        goTo: 5,
        type: 'door',
        showsAt: {
          x: 0,
          y: 160
        }
      },
      {
        x: 48,
        y: 128,
        width: 16,
        height: 16,
        id: 'exit-6-1',
        goTo: 11,
        type: 'portal',
        showsAt: {
          x: 176,
          y: 144
        }
      }
    ],
    blood: [
      {
        x: 16,
        y: 0,
        isActive: true
      }
    ],
    item: {
      x: 192,
      y: 64,
      width: 16,
      height: 32,
      item: 3
    },
    portal: {
      x: 48,
      y: 128,
      width: 16,
      height: 16
    }
  },
  {
    index: 7,
    startingPoint: {
      x: 48,
      y: 48
    },
    platforms: [
      {
        x: 160,
        y: 0,
        width: 96,
        height: 16
      },
      {
        x: 0,
        y: 0,
        width: 160,
        height: 16
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 32
      },
      {
        x: 0,
        y: 0,
        width: 16,
        height: 32
      },
      {
        x: 16,
        y: 176,
        width: 240,
        height: 16
      },
      {
        x: 0,
        y: 144,
        width: 16,
        height: 48
      },
      {
        x: 0,
        y: 144,
        width: 64,
        height: 16
      },
      {
        x: 32,
        y: 144,
        width: 32,
        height: 32
      },
      {
        x: 144,
        y: 48,
        width: 48,
        height: 16
      },
      {
        x: 64,
        y: 80,
        width: 48,
        height: 16
      }
    ],
    enemies: {
      spikes: [],
      bats: [],
      fallingWalls: [],
      saws: []
    },
    exits: [
      {
        x: 144,
        y: 0,
        width: 32,
        height: 16,
        id: 'exit-7-0',
        goTo: 5,
        type: 'door',
        showsAt: {
          x: 160,
          y: 176
        }
      },
      {
        x: 0,
        y: 16,
        width: 16,
        height: 128,
        id: 'exit-7-1',
        goTo: 8,
        type: 'door',
        showsAt: {
          x: 240,
          y: 64
        }
      },
      {
        x: 240,
        y: 16,
        width: 16,
        height: 176,
        id: 'exit-7-2',
        goTo: 9,
        type: 'door',
        showsAt: {
          x: 0,
          y: 96
        }
      },
      {
        x: 0,
        y: 176,
        width: 32,
        height: 16,
        id: 'exit-7-3',
        goTo: 11,
        type: 'door',
        showsAt: {
          x: 0,
          y: 0
        }
      }
    ],
    blood: [
      {
        x: 160,
        y: 32,
        isActive: true
      }
    ]
  },
  {
    index: 8,
    startingPoint: {
      x: 48,
      y: 48
    },
    platforms: [
      {
        x: 240,
        y: 0,
        width: 16,
        height: 32
      },
      {
        x: 0,
        y: 0,
        width: 256,
        height: 16
      },
      {
        x: 0,
        y: 176,
        width: 256,
        height: 16
      },
      {
        x: 208,
        y: 128,
        width: 48,
        height: 64
      },
      {
        x: 192,
        y: 144,
        width: 32,
        height: 48
      },
      {
        x: 160,
        y: 144,
        width: 48,
        height: 48
      },
      {
        x: 0,
        y: 0,
        width: 16,
        height: 192
      },
      {
        x: 0,
        y: 112,
        width: 112,
        height: 32
      },
      {
        x: 64,
        y: 96,
        width: 48,
        height: 32
      },
      {
        x: 96,
        y: 96,
        width: 32,
        height: 16
      },
      {
        x: 96,
        y: 80,
        width: 48,
        height: 16
      },
      {
        x: 80,
        y: 128,
        width: 32,
        height: 48
      },
      {
        x: 48,
        y: 0,
        width: 16,
        height: 64
      },
      {
        x: 32,
        y: 48,
        width: 32,
        height: 16
      }
    ],
    enemies: {
      spikes: [],
      bats: [
        {
          x: 96,
          y: 64,
          axis: 'horizontal',
          range: 41,
          speed: 0.04,
          direction: 1
        },
        {
          x: 112,
          y: 144,
          axis: 'vertical',
          range: 24,
          speed: 0.03,
          direction: 1
        }
      ],
      fallingWalls: [
        {
          x: 32,
          y: 48,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 0,
          y: 0,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        }
      ],
      saws: []
    },
    exits: [
      {
        x: 240,
        y: 16,
        width: 16,
        height: 128,
        id: 'exit-8-0',
        goTo: 7,
        type: 'door',
        showsAt: {
          x: 0,
          y: 96
        }
      }
    ],
    blood: [
      {
        x: 32,
        y: 32,
        isActive: true
      }
    ],
    skeletonDoor: {
      x: 80,
      y: 160,
      width: 32,
      height: 32
    },
    batteryContainer: {
      x: 16,
      y: 144,
      width: 48,
      height: 48
    }
  },
  {
    index: 9,
    startingPoint: {
      x: 48,
      y: 48
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 32
      },
      {
        x: 0,
        y: 0,
        width: 256,
        height: 16
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 96
      },
      {
        x: 192,
        y: 0,
        width: 64,
        height: 48
      },
      {
        x: 176,
        y: 80,
        width: 80,
        height: 16
      },
      {
        x: 0,
        y: 176,
        width: 256,
        height: 16
      },
      {
        x: 80,
        y: 128,
        width: 128,
        height: 64
      },
      {
        x: 192,
        y: 144,
        width: 32,
        height: 48
      },
      {
        x: 208,
        y: 144,
        width: 32,
        height: 48
      },
      {
        x: 224,
        y: 160,
        width: 32,
        height: 32
      },
      {
        x: 48,
        y: 144,
        width: 48,
        height: 48
      },
      {
        x: 48,
        y: 144,
        width: 16,
        height: 48
      },
      {
        x: 32,
        y: 160,
        width: 32,
        height: 32
      },
      {
        x: 32,
        y: 96,
        width: 32,
        height: 16
      },
      {
        x: 80,
        y: 48,
        width: 48,
        height: 16
      },
      {
        x: 16,
        y: 16,
        width: 32,
        height: 16
      }
    ],
    enemies: {
      spikes: [
        {
          x: 96,
          y: 128,
          width: 16,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 96,
          y: 128,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 112,
          y: 128,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 144,
          y: 128,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 160,
          y: 128,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 176,
          y: 128,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        }
      ],
      bats: [
        {
          x: 32,
          y: 96,
          axis: 'horizontal',
          range: 41,
          speed: 0.02,
          direction: 1
        },
        {
          x: 160,
          y: 64,
          axis: 'horizontal',
          range: 41,
          speed: 0.02,
          direction: 1
        }
      ],
      fallingWalls: [
        {
          x: 96,
          y: 0,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 112,
          y: 0,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 128,
          y: 0,
          width: 16,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        },
        {
          x: 128,
          y: 0,
          width: 32,
          height: 32,
          trigger: 'below',
          fallSpeed: 1.5
        }
      ],
      saws: []
    },
    exits: [
      {
        x: 0,
        y: 16,
        width: 16,
        height: 176,
        id: 'exit-9-0',
        goTo: 7,
        type: 'door',
        showsAt: {
          x: 240,
          y: 96
        }
      },
      {
        x: 240,
        y: 96,
        width: 16,
        height: 96,
        id: 'exit-9-1',
        goTo: 10,
        type: 'door',
        showsAt: {
          x: 0,
          y: 112
        }
      }
    ],
    blood: [
      {
        x: 176,
        y: 16,
        isActive: true
      },
      {
        x: 16,
        y: 16,
        isActive: true
      }
    ]
  },
  {
    index: 10,
    startingPoint: {
      x: 192,
      y: 128
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 96
      },
      {
        x: 0,
        y: 144,
        width: 16,
        height: 48
      },
      {
        x: 0,
        y: 144,
        width: 96,
        height: 16
      },
      {
        x: 80,
        y: 144,
        width: 176,
        height: 48
      },
      {
        x: 0,
        y: 32,
        width: 48,
        height: 16
      },
      {
        x: 0,
        y: 0,
        width: 256,
        height: 16
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 144
      },
      {
        x: 192,
        y: 64,
        width: 64,
        height: 48
      }
    ],
    enemies: {
      spikes: [],
      bats: [],
      fallingWalls: [],
      saws: []
    },
    exits: [
      {
        x: 0,
        y: 96,
        width: 16,
        height: 48,
        id: 'exit-10-0',
        goTo: 9,
        type: 'door',
        showsAt: {
          x: 240,
          y: 128
        }
      }
    ],
    blood: [
      {
        x: 144,
        y: 128,
        isActive: true
      },
      {
        x: 32,
        y: 48,
        isActive: true
      }
    ],
    item: {
      x: 208,
      y: 64,
      width: 16,
      height: 16,
      item: 1
    }
  },
  {
    index: 11,
    startingPoint: {
      x: 16,
      y: 16
    },
    platforms: [
      {
        x: 0,
        y: 0,
        width: 16,
        height: 192
      },
      {
        x: 16,
        y: 0,
        width: 240,
        height: 16
      },
      {
        x: 0,
        y: 32,
        width: 64,
        height: 112
      },
      {
        x: 0,
        y: 160,
        width: 112,
        height: 32
      },
      {
        x: 48,
        y: 32,
        width: 64,
        height: 80
      },
      {
        x: 48,
        y: 112,
        width: 64,
        height: 64
      },
      {
        x: 96,
        y: 32,
        width: 32,
        height: 64
      },
      {
        x: 128,
        y: 32,
        width: 80,
        height: 16
      },
      {
        x: 144,
        y: 48,
        width: 64,
        height: 48
      },
      {
        x: 144,
        y: 96,
        width: 64,
        height: 48
      },
      {
        x: 96,
        y: 176,
        width: 64,
        height: 16
      },
      {
        x: 128,
        y: 112,
        width: 32,
        height: 48
      },
      {
        x: 240,
        y: 0,
        width: 16,
        height: 192
      },
      {
        x: 144,
        y: 128,
        width: 32,
        height: 32
      },
      {
        x: 192,
        y: 128,
        width: 16,
        height: 48
      },
      {
        x: 160,
        y: 144,
        width: 32,
        height: 48
      },
      {
        x: 176,
        y: 176,
        width: 80,
        height: 16
      },
      {
        x: 224,
        y: 32,
        width: 32,
        height: 112
      },
      {
        x: 192,
        y: 144,
        width: 32,
        height: 32
      }
    ],
    enemies: {
      spikes: [
        {
          x: 48,
          y: 160,
          width: 16,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 32,
          y: 160,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 96,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 112,
          y: 176,
          width: 32,
          height: 16,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        },
        {
          x: 192,
          y: 144,
          width: 32,
          height: 32,
          state: 'off',
          damageState: 'on',
          delay: 1.5
        }
      ],
      bats: [],
      fallingWalls: [],
      saws: [
        {
          x: 144,
          y: 160,
          width: 32,
          height: 32,
          motion: 'linear',
          center: {
            x: 144,
            y: 160
          },
          range: 1,
          speed: 0
        }
      ]
    },
    exits: [
      {
        x: 0,
        y: 0,
        width: 32,
        height: 16,
        id: 'exit-11-0',
        goTo: 7,
        type: 'door',
        showsAt: {
          x: 16,
          y: 176
        }
      },
      {
        x: 144,
        y: 176,
        width: 32,
        height: 16,
        id: 'exit-11-1',
        goTo: 12,
        type: 'door',
        showsAt: {
          x: 160,
          y: 0
        }
      },
      {
        x: 160,
        y: 144,
        width: 32,
        height: 16,
        id: 'exit-11-2',
        goTo: 6,
        type: 'door',
        showsAt: {
          x: 48,
          y: 128
        }
      }
    ],
    blood: [
      {
        x: 0,
        y: 144,
        isActive: true
      },
      {
        x: 160,
        y: 144,
        isActive: true
      }
    ],
    portal: {
      x: 160,
      y: 128,
      width: 32,
      height: 32
    },
    foreground: true
  }
];
