import type { KpiItemType } from "dataviz-components";

export  function getRandomInRange(
  min: number,
  max: number,
  decimals: number = 4
): number {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

export  function generateWord() {
  const words = [
    "Lorem",
    "Ipsum",
    "Dolor",
    "Sit",
    "Amet",
    "Consectetur",
    "Adipiscing",
    "Elit",
    "Sed",
    "Do",
    "Eiusmod",
    "Tempor",
    "Incididunt",
    "Ut",
    "Labore",
    "Et",
    "Dolore",
    "Magna",
    "Aliqua",
  ];
  return words[Math.floor(Math.random() * words.length)];
}

export  function generateWords(n: number) {
  const words = [];
  for (let i = 0; i < n; i++) {
    words.push(generateWord());
  }
  return words

export  function randomBoolean(){
  return Math.random() < 0.5;
}


export  function generateFakeKpis(n: number = 3): KpiItemType[] {
  const kpis: KpiItemType[] = [];

  // Generate points in Tuscany
  for (let i = 0; i < n; i++) {
    const obj = {
        title: generateWords(getRandomInRange(1,4)),
  value: getRandomInRange(0,9999),
  percentage: randomBoolean()? getRandomInRange(1,99):undefined,
  background_color:  randomBoolean()? "#efefef":"",
  value_prefix: i%3 ===0 ? "curerncy": undefined,
  value_suffix: i%3 ===0 ? "€": undefined,
  show_flow:  randomBoolean(),
  flow_value: Math.random(),
  flow_direction:randomBoolean()? "+" : "-",
  flow_detail?:randomBoolean() ? generateWords(1):undefined,
  footer_text?:randomBoolean() ? generateWords(getRandomInRange(1,4)):undefined
    }
    kpis.push(obj);
  }


  return kpis;
}



