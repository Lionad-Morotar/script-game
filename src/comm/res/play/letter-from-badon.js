export default {
  _id: 'letter-from-badon',
  name: '巴德将军的信',
  stars: 1,
  tags: ['热身', '封闭本', '城堡'],
  impressions: [
    '有趣', '非常欢喜', '热身运动',
  ],
  brief: '隐藏自己的秘密, 发现别人的诡秘, 巴顿将军的死, 你能否发掘真相?',
  intro: '此剧本属于谋杀之谜的入门剧本，游戏时间短，流程简单。新手玩家热身剧本，内容偏简单\n1. 每位玩家选择自己要扮演的人物，并阅读自己的人物手册\n2. 根据人物剧本里提供的信息（需要隐瞒的，不需要隐瞒的）来做表述和表演\n3. 回合线索是只有你自己知道的线索，你可以选择适当公开，也可以选择隐瞒\n4. 此游戏可以只进行一回合，玩家最终投票凶手，或猜想其他你认为的结局\n5. 巴德将军的信是游戏的真相，将在合适的时间被公开',
  roles: [
    {
      name: '杰克王子',
      key: 'prince',
      nick: ['王子'],
      brief: '王国现任国王之子，巴德将军的忘年之交，感受到了王国制度的腐朽而不惜和自己的父亲产生冲突而创立了革新派。'
    },
    {
      name: '亨利二世',
      key: 'king',
      nick: ['国王'],
      brief: '王国现任国王，因为年龄太大疾病缠身很少在公众场合现身，但在人民身中依然保留着一定的威望，与众贵族组成了保守派对抗王子的革新派。'
    },
    {
      name: '汤姆',
      key: 'tom',
      nick: ['管家'],
      brief: '城堡的管家，跟随国王多年，对国王忠心耿耿，曾发出过为了国王愿意做任何事的言论，是少数能随意进入国王房间的例外。'
    },
    {
      name: '玛丽',
      key: 'marry',
      nick: ['女仆'],
      brief: '城堡的女仆，负责清理花园准备食物等琐事，这次案件的第一发现者。'
    },
    {
      name: '哈里斯',
      key: 'hadis',
      nick: ['门卫'],
      brief: '国王寝室的门卫，年轻力壮，负责在国王睡觉时对任何未经国王允许而进入国王寝室的人进行阻拦。'
    },
    {
      name: '巴德将军',
      disabled: true,
      key: 'badon',
      nick: ['死者'],
      brief: '作为将军为王国立下了不少功劳，在人民心中德高望重，在派系斗争中力挺王子的革新派。'
    },
  ],
  segments: [
    {
      name: '背景介绍',
      content: [
        {
          type: 'text',
          data: '此剧本属于谋杀之谜的入门剧本，游戏时间短，流程简单。新手玩家热身剧本，内容偏简单\n1. 每位玩家选择自己要扮演的人物，并阅读自己的人物手册\n2. 根据人物剧本里提供的信息（需要隐瞒的，不需要隐瞒的）来做表述和表演\n3. 回合线索是只有你自己知道的线索，你可以选择适当公开，也可以选择隐瞒\n4. 此游戏可以只进行一回合，玩家最终投票凶手，或猜想其他你认为的结局\n5. 巴德将军的信是游戏的真相，将在合适的时间被公开'
        }
      ]
    },
    {
      name: '人物剧本',
      content: [
        {
          type: 'text',
          unValidData: [
            {
              role: 'hadis',
              data: '你选择了门卫哈迪斯'
            },
            {
              role: 'king',
              data: '你选择了国王亨利二世'
            },
            {
              role: 'prince',
              data: '你选择了杰克王子'
            },
            {
              role: 'marry',
              data: '你选择了女仆玛丽'
            },
            {
              role: 'tom',
              data: '你选择了管家汤姆'
            }
          ]
        },
        {
          type: 'line',
          data: '你该透露的线索'
        },
        {
          type: 'text',
          unValidData: [
            {
              role: 'hadis',
              data: '你是国王寝室的门卫，工作时间是晚上6点到次日管家到寝室叫国王起床。昨晚10点左右巴德将军说找国王有事，你便让他进入了国王的房间，大概在凌晨1点巴德将军才一脸表情严肃的出了房间。房间的隔音功能很好，你完全不知道巴德将军在里面和国王在做什么。'
            },
            {
              role: 'king',
              data: '昨晚巴德将军来到了你的房间，和你就派系斗争的事情进行了长达几个小时的辩论，最后他和你不欢而散，你忘记了他离开的时间。今早管家如同平常那样叫你起床并给你送来了早餐，吃早餐时你发现你寝室的一块地毯不见了，管家告诉你你寝室的地毯上有污渍拿去洗了，你点头同意了。'
            },
            {
              role: 'prince',
              data: '今早，传来了你的好友巴德将军身亡的噩耗。你从法医那得知巴德将军全身骨折，你推断他曾经从高处落下。'
            },
            {
              role: 'marry',
              data: '今早你清理小花园的时候发现了巴德将军的尸体，致命伤是尸体后背笔直插着的一把小刀。经法医鉴定，尸体全身还有着多处骨折。你最后一次见到巴德将军是凌晨1点左右他经过小花园回到他的房间时。'
            },
            {
              role: 'tom',
              data: '今天早上你和往常一样给国王送餐，发现国王还在睡觉，为了不打扰国王的睡眠你便让门卫先行离开了。你发现寝室的地毯上有些污渍，你便拿走去清洗了，走之前顺便将此事告诉了国王。'
            }
          ]
        },
        {
          type: 'line',
          data: '你需隐瞒的事实'
        },
        {
          type: 'text',
          unValidData: [
            {
              role: 'hadis',
              data: '年轻力壮的你哪能忍受整夜站在门前，你需要你个女人的滋润。所以，每晚凌晨0点到2点是你和女仆玛丽的幽会时间，而这件事一旦被发现你便会因为玩忽职守而失去这份好工作。实际上你2点回到房间后一直没有看到巴德将军出来，所以你索性编造了巴德将军1点出来的谎言。'
            },
            {
              role: 'king',
              data: '你最近病得越来越重了，经常痛得彻夜难眠，但这点一旦透露出来会对你的派系产生极大的动摇，所以你没有告诉任何人而开始每晚服用安眠药。所以昨晚你完全不知道巴德将军的到来，也不知道他是何时离开的。也许你会认为他在你的房间呆了几个小时十分奇怪，但因为一旦怀疑到你会使你的声望下降而输掉派系斗争，所以你决定对此缄默不语。'
            },
            {
              role: 'prince',
              data: '虽然你是革新派的领袖，但你的好友巴德将军的贡献功不可没，他相信革新派才是王国的明天，为了王国的未来不惜和他的老主子国王反目。这次巴德的死虽然令你痛心但你内心却是无比的窃喜，因为这是你推翻保守派的一次可贵的机会，无论真相如何你都要抓住这次机会抹黑国王让他在人民心中的声望一落千丈。'
            },
            {
              role: 'marry',
              data: '你和门卫哈里斯有着不一般的关系，你与他会在每晚凌晨0点到2点幽会，而这件事一旦被发现哈里斯便会因为玩忽职守而失去他的工作。今天发现尸体后哈里斯在暗地偷偷拜托你假装在凌晨1点左右看到了巴德将军，你同意了。'
            },
            {
              role: 'tom',
              data: '今早你来到寝室后你大吃了一惊，巴德将军躺在寝室的一块地毯上，背上插着一把小刀，血已经染红了地毯。你觉得这件事一旦传出去会对国王的名誉造成极大的打击，因此你偷偷处理了这件事。你先将外面的门卫支走，再将尸体从窗户丢出，最后将染血的地毯放进餐车准备拿走将上面的血迹洗掉。这一切做完后，你才叫醒了国王。'
            }
          ]
        },
        {
          type: 'line',
          data: '你的游戏目标'
        },
        {
          type: 'text',
          unValidData: [
            {
              role: 'hadis',
              data: '1. 将军的死对你来说触动不大, 你只要不要被大家知道你玩忽职守(而丢掉工作), 就算胜利\n2. 寻找真相, 保护自己和女仆玛丽不要被投票出局'
            },
            {
              role: 'king',
              data: '1. 维护自己的威严, 不要是自己陷入绯言乱语而丢失声望\n2. 将军的死是一个绝好的抹黑王子革新派的好机会'
            },
            {
              role: 'prince',
              data: '1. 无论真相如何你都要抓住这次机会抹黑国王'
            },
            {
              role: 'marry',
              data: '1. 不要向大家透露你和哈迪斯不寻常的关系\n2. 寻找真相, 保护自己不要被投票出局'
            },
            {
              role: 'tom',
              data: '1. 不要向大家透露将军死在国王房间里这件事\n2. 寻找真相, 同时保护自己和国王不要被投票出局'
            }
          ]
        },
        {
          type: 'line',
          data: '特殊技能',
          // unValid: {
          //   role: ['king', 'prince', 'marry', 'hadis', 'tom']
          // }
        },
        {
          type: 'text',
          unValidData: [
            {
              role: 'king',
              data: '管家汤姆是你的心腹, 他不能将你投票出局'
            },
            {
              role: 'tom',
              data: '你是国王的心腹, 你不能将国王投票出局'
            },
            {
              role: 'prince',
              data: '你是年轻的革新派领袖, 汲取了巴德将军的干劲使你在投票阶段有一票顶两票的能力'
            },
            {
              role: 'marry',
              data: '因为你和哈迪斯特殊的关系, 你和哈迪斯不能相互投票'
            },
            {
              role: 'hadis',
              data: '因为你和哈迪斯特殊的关系, 你和哈迪斯不能相互投票'
            }
          ]
        },
      ]
    },
    {
      name: '介绍自己',
      intro: '此阶段, 请女仆玛丽, 国王亨利二世, 门卫哈里斯, 管家汤姆, 王子杰克依此进行自我介绍',
      content: [
        {
          type: 'line',
          data: '人物介绍'
        },
        {
          type: 'text',
          data: '向大家介绍一下你自己, 根据人物剧本里提供的信息（需要隐瞒的，不需要隐瞒的）来做表述和表演'
        },
      ]
    },
    {
      name: '探索阶段',
      intro: '你发觉的线索只有你自己知道，你可以选择适当公开，也可以选择隐瞒',
      content: [
        {
          type: 'text',
          data: '你可以在地点探索, 直到将线索发掘完毕',
        },
        {
          type: 'line',
          data: '探索'
        },
        {
          type: 'options',
          key: 'thread',
          unValidData: [
            {
              role: 'tom',
              data: [
                {
                  name: '房间',
                  key: 'tom-room',
                  data: [
                    {
                      key: 'stolen-key',
                    },
                    {
                      key: 'cut-finger',
                    }
                  ]
                },
                {
                  name: '回忆',
                  key: 'tom-memory',
                  data: [
                    {
                      key: 'black-briefcase',
                    }
                  ]
                }
              ]
            },
            {
              role: 'marry',
              data: [
                {
                  name: '厨房',
                  key: 'marry-kitchen',
                  data: [
                    {
                      key: 'opened-door',
                    }
                  ]
                },
                {
                  name: '回忆',
                  key: 'marry-memory',
                  data: [
                    {
                      key: 'wash',
                    },
                    {
                      key: 'pill',
                    }
                  ]
                }
              ]
            },
            {
              role: 'prince',
              data: [
                {
                  name: '国王寝室',
                  key: 'prince-at-kings-room',
                  data: [
                    {
                      key: 'the-window',
                    }
                  ]
                },
                {
                  name: '回忆',
                  key: 'prince-memory',
                  data: [
                    {
                      key: 'king-take-pill',
                    }
                  ]
                },
                {
                  name: '巴德将军的房间',
                  key: 'prince-in-badon-memory',
                  data: [
                    {
                      key: 'the-letter',
                    }
                  ]
                }
              ]
            },
            {
              role: 'king',
              data: [
                {
                  name: '回忆',
                  key: 'king-memory',
                  data: [
                    {
                      key: 'later-wake-up',
                    },
                    {
                      key: 'unnormal-link',
                    },
                    {
                      key: 'hadis-take-a-case',
                    }
                  ]
                }
              ]
            },
            {
              role: 'hadis',
              data: [
                {
                  name: '回忆',
                  key: 'hadis-memory',
                  data: [
                    {
                      key: 'pong',
                    },
                    {
                      key: 'morning',
                    },
                    {
                      key: 'badon-take-a-case',
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: '讨论阶段',
      intro: '在这个阶段, 你可以将你已知的线索筛选后分享给大家',
      content: [
        {
          type: 'text',
          data: '请注意, 你不一定要分享所有的线索! 请根据你的任务目标适当分享线索~'
        },
      ]
    },
    {
      name: '圆桌阶段',
      intro: '在这个阶段, 所有人进行最后的讨论, 并投票决定游戏的走向',
      content: [
        {
          type: 'text',
          data: '请注意, 每个人都有自己难言的秘密, 请不要互相苛刻或是指责, 请根据你的角色目标说出真相或是做最后的隐藏吧~'
        },
      ]
    }
  ],
  threadsCollections: {
    'tom-room': {
      name: '汤姆的房间'
    },
    'tom-memory': {
      name: '汤姆的回忆'
    },
    'kitchen': {
      name: '城堡的厨房'
    },
    'marry-memory': {
      name: '玛丽的回忆'
    },
    'king-room': {
      name: '国王寝室'
    },
    'prince-memory': {
      name: '王子的回忆'
    },
    'badon-room': {
      name: '巴顿将军的寝室'
    },
    'king-memory': {
      name: '国王的回忆'
    },
    'hadis-room': {
      name: '哈迪斯的房间'
    },
    'hadis-memory': {
      name: '哈迪斯的回忆'
    }
  },
  threads: {
    'stolen-key': {
      collectionKey: 'tom-room',
      name: '备用钥匙',
      data: [
        {
          type: 'text',
          data: '你有城堡里所有房间的备用钥匙，但今天你发现厨房的那把不见了，也许是被谁偷走了。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2013/06/08/23/23/key-123554__340.jpg'
        }
      ]
    },
    'cut-finger': {
      collectionKey: 'tom-room',
      name: '切到手指',
      data: [
        {
          type: 'text',
          data: '你昨晚在你自己房间吃水果时不巧切到了手指，血滴到了你宝贵的地毯上。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2014/12/20/13/59/vegetables-573958__340.jpg'
        }
      ],
    },
    'black-briefcase': {
      collectionKey: 'tom-memory',
      name: '藏公文包',
      data: [
        {
          type: 'text',
          data: '你在巴德尸体的旁边发现了一个空空的黑色公文包，你将它偷偷拿走藏了起来。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2018/08/07/04/23/accessory-3589060__340.png'
        }
      ],
    },
    'opened-door': {
      collectionKey: 'kitchen',
      name: '厨房门',
      data: [
        {
          type: 'text',
          data: '你昨天晚上离开厨房是将门反锁了的，今天进入厨房时发现门没锁，而除了你就只要管家有厨房的备用钥匙了。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2017/03/03/13/56/key-2114046__340.jpg'
        }
      ],
    },
    'wash': {
      collectionKey: 'marry-memory',
      name: '管家洗地毯',
      data: [
        {
          type: 'text',
          data: '你今天前往小花园工作时发现管家正在清洗一条地毯，地毯上有着某种红色液体。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2017/06/20/12/42/alpaca-2422975__340.jpg'
        }
      ],
    },
    'pill': {
      collectionKey: 'marry-memory',
      name: '安眠药',
      data: [
        {
          type: 'text',
          data: '你收拾国王的房间时，发现了安眠药的药盒。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775__340.jpg'
        }
      ],
    },
    'the-window': {
      collectionKey: 'king-room',
      name: '窗户位置',
      data: [
        {
          type: 'text',
          data: '尸体发现地点的正上方，正是你的父亲国王亨利二世寝室的窗户。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2016/09/19/00/25/window-1679344__340.jpg'
        }
      ],
    },
    'king-take-pill': {
      collectionKey: 'prince-memory',
      name: '国王服药',
      data: [
        {
          type: 'text',
          data: '巴德将军曾告诉你国王似乎正在服用某种药物。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2016/12/05/19/43/pill-1884775__340.jpg'
        }
      ],
    },
    'the-letter': {
      collectionKey: 'badon-room',
      name: '巴德将军的信',
      data: [
        {
          type: 'text',
          data: '你在巴德将军的房间中发现了一封信。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2015/07/19/10/00/still-life-851328__340.jpg'
        },
        {
          type: 'letter',
          data: '各位发现这封信时，我相信我已经不在人世了吧，那就把这封信权当作我的遗书吧。杰克王子的革新派，是一颗为我们王国指明未来道路的明星，只有革新派才会为王国带来更辉煌的明天。我的好友杰克王子年轻有为，为革新派挥洒着自己的才华，而我却年事已高，只能靠着以往的功劳混得的将军之位才能有一席之地，暗地里我为自己的无能羞愧不已。 我还能为王国的明天献上的，就只剩我这条老命了。很早以前，我就发现国王开始服用安眠药，我也开始筹备我的计划了。就在昨天，我开始了我的计划，我先用从管家那偷到的厨房钥匙利用厨房的冰箱中将一把小刀固定在一块冰块上，再将冰块装进公文包中带入了国王的寝室。接下来我只要轻轻一躺……  等我的尸体被发现，估计已经是第二天早上了吧，冰块全化掉后与我的血混在一起相信没有人会发现，而一旦在国王的寝室中发现我的尸体的事传出去，相信保守派的声望一定会一落千丈，我相信睿智的王子一定会好好把握住这次机会的。  如果最后这个计划败露了，那就罢了吧。我这封遗书也能证明国王的清白。这也许就是我生命的最后，最后的那么一点良知吧。'
        }
      ],
    },
    'later-wake-up': {
      collectionKey: 'king-memory',
      name: '起床时间',
      data: [
        {
          type: 'text',
          data: '今天早上管家叫你起床的时间比平时晚了不少。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2017/07/31/19/32/architecture-2560300__340.jpg'
        }
      ],
    },
    'unnormal-link': {
      collectionKey: 'king-memory',
      name: '门卫和女仆',
      data: [
        {
          type: 'text',
          data: '你发现门卫和女仆似乎有什么不同寻常的关系。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2016/07/28/20/00/hand-1549399__340.jpg'
        }
      ],
    },
    'hadis-take-a-case': {
      collectionKey: 'king-memory',
      name: '管家带公文包',
      data: [
        {
          type: 'text',
          data: '你发现管家离开时	还顺便拿走了一个黑色公文包。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2018/08/07/04/23/accessory-3589060__340.png'
        }
      ],
    },
    'pong': {
      collectionKey: 'hadis-memory',
      name: '重物落地',
      data: [
        {
          type: 'text',
          data: '你今天早上离开寝室不久似乎听到了重物落地的声音。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2016/11/13/02/31/dizziness-1820223__340.jpg'
        }
      ],
    },
    'morning': {
      collectionKey: 'hadis-memory',
      name: '奇怪的管家',
      data: [
        {
          type: 'text',
          data: '平时早上管家会推着餐车给国王送餐，国王用完餐后将餐车推出来后顺便告诉你可以离开了，但今天早上管家进入后不久便探出头来告诉你可以离开了，你没有多想就走了。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2015/09/29/15/07/butler-964006__340.jpg'
        }
      ],
    },
    'badon-take-a-case': {
      collectionKey: 'hadis-memory',
      name: '公文包失踪',
      data: [
        {
          type: 'text',
          data: '你想起巴德将军进入房间时拿着一个沉甸甸的黑色公文包，但发现尸体时这个公文包不见了。'
        },
        {
          type: 'image',
          data: 'https://cdn.pixabay.com/photo/2018/08/07/04/23/accessory-3589060__340.png'
        }
      ]
    },
  }
}
