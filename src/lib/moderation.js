export const badWords = [
  // profanity
  "fuck",
  "fucking",
  "fucker",
  "shit",
  "shitty",
  "bullshit",
  "damn",
  "goddamn",
  "asshole",
  "jackass",
  "dumbass",
    "dumb",
  "loser",
  "jerk",

  // insults
  "idiot",
  "moron",
  "stupid",
  "dumb",
  "loser",
  "failure",
  "pathetic",
  "worthless",
  "useless",
  "garbage",
  "trash",
  "cringe",
  "clown",
  "jerk",
  "retard",
  "retarded",

  // harassment
  "kill yourself",
  "go die",
  "drop dead",
  "die",
  "suicide",
  "hang yourself",
  "nobody likes you",
  "nobody loves you",

  // sexual insults
  "slut",
  "whore",
  "hoe",
  "thot", 

  // common internet toxicity
  "stfu",
  "gtfo",
  "wtf",
  "fml",
  "mf",
  "mfer", 
  "screw you",
  "shut up",

  // bullying
  "ugly",
  "fatass",
  "disgusting",
  "creep",
  "weirdo",
  "psycho",
  "freak",
  "lunatic",

  // explicit terms (common)
  "sex",
  "sexy",
  "nude",
  "naked",
  "porn",
  "horny",
  "boobs",
  "dick",
  "penis",
  "vagina",
  "pussy",
  "cock",
  "cum",
  "blowjob",
  "handjob",
  "nudes",
  "milf"
 
];


///////////////// normalised text

export function normalizeText(text) {
  return text
    .toLowerCase()

    // common replacements
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/!/g, "i")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/0/g, "o")
    .replace(/5/g, "s")
    .replace(/7/g, "t")

    // remove spaces and symbols
    .replace(/[\s\W_]+/g, "");
}














export function moderateMessage(message) {
 
    const normalized = normalizeText(message);


  const foundWords = badWords.filter(word =>

      normalized.includes(normalizeText(word))

  );


  let cleanMessage = message;

badWords.forEach((word) => {
 
  const regex = new RegExp(`\\b${word}\\b`, "gi");

  cleanMessage = cleanMessage.replace(regex, (match) => {
    if (match.length <= 2) return match;

    return (
      match[0] +
      "*".repeat(match.length - 2) +
      match[match.length - 1]
    );
  });

}); 

  return {
    isToxic: foundWords.length > 3,
    toxicScore: foundWords.length,
    foundWords,
    cleanMessage
  };
}