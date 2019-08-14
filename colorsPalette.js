const greenTree = {
  sunny: [
    "#b8d23d",
    "#a7c33d",
    "#92a927",
    "#6b8b29",
    "#647a24",
    "#4d6019",
    "#4b6e24",
    "#344c0c",
    "#1e3418",
    "#244626",
    "#1f3d21"
  ],
  cloudy: [
    "#acbf4c",
    "#8ba03e",
    "#92a927",
    "#6b8b29",
    "#647a24",
    "#4d6019",
    "#4b6e24",
    "#344c0c",
    "#1e3418",
    "#244626",
    "#1f3d21"
  ]
};

const julyTree = {
  sunny: [
    "#b3b221",
    "#ada81f",
    "#9a9f36",
    "#888d18",
    "#768322",
    "#6a751d",
    "#5d6d0f",
    "#52602c",
    "#404b0d",
    "#313b14",
    "#22301a"
  ],
  cloudy: [
    "#9a9f36",
    "#888d18",
    "#768322",
    "#6a751d",
    "#5d6d0f",
    "#52602c",
    "#404b0d",
    "#313b14",
    "#22301a"
  ]
};

//only cloudy
const augustTree = {
  sunny: [
    "#b8a83b",
    "#a79d31",
    "#928b30",
    "#848431",
    "#736f19",
    "#676727",
    "#59580f",
    "#4d4b0e",
    "#3f4110",
    "#2e3510"
  ],
  cloudy: [
    "#b8a83b",
    "#a79d31",
    "#928b30",
    "#848431",
    "#736f19",
    "#676727",
    "#59580f",
    "#4d4b0e",
    "#3f4110",
    "#2e3510"
  ]
};

const septemberTree = {
  sunny: [
    "#d8bb27",
    "#c5aa23",
    "#b79417",
    "#ad8b15",
    "#9e7d21",
    "#8d680d",
    "#7c5f09",
    "#675110",
    "#5b4b05",
    "#4e3a0a",
    "#3f3706"
  ],
  cloudy: [
    "#bc911c",
    "#ac831f",
    "#9e7a0a",
    "#8e6c11",
    "#7c680a",
    "#675110",
    "#5b4b05",
    "#4e3a0a",
    "#3f3706"
  ]
};

//only one
const octoberTree = {
  sunny: [
    "#fdab45",
    "#e5993b",
    "#d18725",
    "#c17028",
    "#bc601a",
    "#b74f12",
    "#a34713",
    "#9b3d0d",
    "#8c3715",
    "#822d0b",
    "#732406",
    "#631e02"
  ],
  cloudy: [
    "#fdab45",
    "#e5993b",
    "#d18725",
    "#c17028",
    "#bc601a",
    "#b74f12",
    "#a34713",
    "#9b3d0d",
    "#8c3715",
    "#822d0b",
    "#732406",
    "#631e02"
  ]
};

//only one
const novemberTree = {
  sunny: [
    "#d18725",
    "#c17028",
    "#bc601a",
    "#b74f12",
    "#a34713",
    "#9b3d0d",
    "#8c3715",
    "#822d0b",
    "#732406",
    "#631e02"
  ],
  cloudy: [
    "#d18725",
    "#c17028",
    "#bc601a",
    "#b74f12",
    "#a34713",
    "#9b3d0d",
    "#8c3715",
    "#822d0b",
    "#732406",
    "#631e02"
  ]
};

export const treeColors = [
  0,
  0,
  greenTree,
  greenTree,
  greenTree,
  greenTree,
  julyTree,
  augustTree,
  septemberTree,
  octoberTree,
  novemberTree,
  0
];

export const skyColors = {
  sunny: ["#6aaede", "#edf6ff"],
  cloudy: ["#b1b9c2", "#cedeeb"],
  snow: ["#bcbdc2", "#d4d3d8"]
};

const winterGrass = [
  ["#dfca9f", "#c2ac86", "#dac79d"],
  ["#d6c398", "#dac49b", "#b19b72"],
  ["#cbb689", "#d3ba91", "#b9a581"],
  ["#d3ba91", "#e1c89f", "#b49b7b"],
  ["#eed5ae", "#9d7f59", "#cdb18c"],
  ["#fadfbb", "#927958", "#daba8a"]
];

const greenGrass = [
  ["#7f9032", "#6b7f26", "#8c9a46"],
  ["#758e2b", "#758927", "#5f7915"],
  ["#587c09", "#608519", "#668621"],
  ["#828e43", "#48690f", "#4c7207"],
  ["#295502", "#7d8a22", "#5c751e"],
  ["#95a34e", "#30570e", "#193903"]
];

const julyGrass = [
  ["#819000", "#8d9f06", "#8b9900"],
  ["#718801", "#7b8901", "#899a01"],
  ["#5e7400", "#758a00", "#8d9b01"],
  ["#545f03", "#687801", "#839102"],
  ["#424f01", "#657101", "#92a002"],
  ["#3e4c01", "#596f00", "#99a901"]
];

const  augustGrass = [
  ["#a8a12c", "#a9a82b", "#989524"],
  ["#838024", "#98971f", "#a9a72a"],
  ["#636619", "#827d1f", "#9c9930"],
  ["#5a5b15", "#74791b", "#9e9937"],
  ["#484f1b", "#6c7412", "#afad54"],
  ["#3c3e0d", "#5d6019", "#b8ba5c"]
];

const septemberGrass = [
  ["#958f44", "#a3a551", "#b1b162"],
  ["#8c863c", "#a2a14d", "#a8a151"],
  ["#7b7625", "#9d964c", "#abaa68"],
  ["#685f21", "#898038", "#9c9f58"],
  ["#5a5617", "#7b7233", "#a19e69"],
  ["#413e16", "#7c733a", "#b6b768"]
];

const octoberGrass = [
  ["#ccb897", "#d6be94", "#e7cfa5"],
  ["#b5986c", "#cfb285", "#dfc59a"],
  ["#a68e5e", "#b19063", "#c5ad81"],
  ["#897248", "#a68a58", "#c1a878"],
  ["#5c4e2c", "#977a45", "#c7a77d"],
  ["#4a391a", "#987a4c", "#d9bd8f"]
];

export const grassColors = [
  octoberGrass,
  octoberGrass,
  greenGrass,
  greenGrass,
  greenGrass,
  greenGrass,
  julyGrass,
  augustGrass,
  septemberGrass,
  octoberGrass,
  octoberGrass,
  octoberGrass
];

export const grassTypes = [
  0,
  0,
  30,
  50,
  100,
  100,
  100,
  100,
  100,
  100,
  0,
  0
];
