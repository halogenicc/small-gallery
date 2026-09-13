// Shared content for the gallery — no backend, everything lives here.
function wikiImg(filename, width) {
  return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(filename) + "?width=" + (width || 1200);
}

const PAINTERS = [
  {
    id: "vangogh",
    name: "Vincent van Gogh",
    years: "1853 – 1890",
    origin: "Dutch, Post-Impressionist",
    portrait: wikiImg("Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_(454045).jpg", 600),
    bio: "Van Gogh painted for barely a decade, mostly in the last few years of his life, yet in that short span he built one of the most recognisable visual languages in Western art. He worked fast and thickly, laying paint on in short, turning strokes that seem to carry the motion of his hand into the finished canvas. Wheat fields, cypress trees, and the night sky appear again and again — not copied from nature so much as re-felt each time, brighter and more urgent with every version. He sold almost nothing while he was alive and depended on his brother Theo for support, but he kept working with a discipline that never wavered, describing painting as the one thing that made him feel calm."
  },
  {
    id: "davinci",
    name: "Leonardo da Vinci",
    years: "1452 – 1519",
    origin: "Italian, High Renaissance",
    portrait: wikiImg("Leonardo_self.jpg", 600),
    bio: "Leonardo treated painting as a branch of the same curiosity that led him to dissect cadavers, study the flight of birds, and sketch machines centuries ahead of their time. He finished very few paintings — perpetually distracted by engineering, anatomy, and his own notebooks — but the ones that survive are built on an unusually deep understanding of light, optics, and the human body. His sfumato technique, blending tone into tone without a visible edge, gave his faces a softness and psychological presence that painters were still trying to match a hundred years later."
  },
  {
    id: "monet",
    name: "Claude Monet",
    years: "1840 – 1926",
    origin: "French, founder of Impressionism",
    portrait: wikiImg("Claude_Monet_1899_Nadar_crop.jpg", 600),
    bio: "Monet cared less about what a thing was than about what light did to it at a particular hour. He would paint the same haystack or cathedral façade over and over, chasing a fleeting effect of sun or mist before it changed. Impression, Sunrise gave an entire movement its name and its early ridicule — critics thought the loose, sketch-like brushwork looked unfinished. In his later years, half-blind and living at Giverny, he turned his own garden and its water-lily pond into a subject he painted for almost thirty years, producing some of the largest and most abstract canvases of his career."
  },
  {
    id: "vermeer",
    name: "Johannes Vermeer",
    years: "1632 – 1675",
    origin: "Dutch, Golden Age painter",
    portrait: wikiImg("Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg", 600),
    bio: "Vermeer painted quietly and slowly, leaving behind fewer than forty known works, most of them scenes of ordinary domestic life caught in a single still moment — a woman reading a letter, pouring milk, weighing pearls. What sets them apart is his handling of light: a window on the left wall, and everything in the room seems to arrange itself around it. He worked in Delft, ran an inn and an art-dealing business on the side to support his large family, and was largely forgotten for two centuries before nineteenth-century critics rediscovered him and reassembled his small, precise body of work."
  }
];

const PAINTINGS = [
  {
    id: "starry-night",
    title: "The Starry Night",
    painterId: "vangogh",
    year: "1889",
    location: "Museum of Modern Art, New York",
    image: wikiImg("Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"),
    description: "Painted from memory and imagination while Van Gogh was a patient at the asylum in Saint-Rémy, this view shows a swirling night sky over a quiet village, with an oversized cypress tree reaching up like a dark flame in the foreground. The turbulence in the sky is often read as a picture of his inner state, but the brushwork is also carefully composed — each stroke follows the curve of a cloud or a star's halo, giving the whole sky a sense of slow, rolling motion."
  },
  {
    id: "sunflowers",
    title: "Sunflowers",
    painterId: "vangogh",
    year: "1889",
    location: "Van Gogh Museum, Amsterdam",
    image: wikiImg("Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg"),
    description: "One of several versions Van Gogh painted to decorate the room he prepared for Paul Gauguin's visit to Arles. He worked almost entirely in shades of yellow, testing how many distinct tones a single colour could hold — pale lemon petals against a warm ochre background, thick ridges of paint standing up from the canvas like the seeds at the centre of the flowers themselves."
  },
  {
    id: "cafe-terrace",
    title: "Café Terrace at Night",
    painterId: "vangogh",
    year: "1888",
    location: "Kröller-Müller Museum, Otterlo",
    image: wikiImg("Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_(Yorck).jpg"),
    description: "Painted directly on the spot, outdoors, at night — unusual for its time. Van Gogh lit the scene with gaslight yellows against a deep blue sky sprinkled with stars, and later wrote that he liked painting at night because darkness seemed to him \"more alive and richly coloured than the day.\""
  },
  {
    id: "irises",
    title: "Irises",
    painterId: "vangogh",
    year: "1889",
    location: "J. Paul Getty Museum, Los Angeles",
    image: wikiImg("Vincent_van_Gogh_-_Irises_(1889).jpg"),
    description: "Painted in the asylum garden at Saint-Rémy during his first week there, before his condition allowed him to venture further afield. The composition is unusually asymmetrical — a single white iris breaks the rhythm of blue-violet blooms — a detail Van Gogh borrowed from the flattened, cropped framing he admired in Japanese prints."
  },
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    painterId: "davinci",
    year: "c. 1503–1519",
    location: "Louvre, Paris",
    image: wikiImg("Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg"),
    description: "Leonardo carried this small portrait with him for years, reworking it long after it was supposedly finished. The sitter's expression changes depending on which part of her mouth and eyes you focus on — an effect of the sfumato technique, which blurs edges so finely that no line tells you exactly where the smile begins. The hazy, imaginary landscape behind her recedes into blue-grey distance, a device Leonardo used to suggest depth without a fixed vanishing point."
  },
  {
    id: "last-supper",
    title: "The Last Supper",
    painterId: "davinci",
    year: "1495–1498",
    location: "Santa Maria delle Grazie, Milan",
    image: wikiImg("Leonardo_da_Vinci_(1452-1519)_-_The_Last_Supper_(1495-1498).jpg"),
    description: "Painted directly onto a dining-hall wall for the monks of Santa Maria delle Grazie, this mural captures the instant Christ tells the apostles that one of them will betray him. Leonardo grouped the twelve into four clusters of three, each reacting differently — shock, denial, anger — turning a static, symmetrical composition into a study of twelve distinct emotional responses to the same sentence."
  },
  {
    id: "lady-with-ermine",
    title: "Lady with an Ermine",
    painterId: "davinci",
    year: "c. 1489–1491",
    location: "Czartoryski Museum, Kraków",
    image: wikiImg("Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg"),
    description: "A portrait of Cecilia Gallerani, mistress of the Duke of Milan, cradling an ermine — likely a pun on her family name and a symbol of purity at court. Leonardo turned her body away from the viewer but her head sharply toward something outside the frame, giving a formal court portrait an unusual sense of a captured, passing moment."
  },
  {
    id: "impression-sunrise",
    title: "Impression, Sunrise",
    painterId: "monet",
    year: "1872",
    location: "Musée Marmottan Monet, Paris",
    image: wikiImg("Monet_-_Impression,_Sunrise.jpg"),
    description: "Painted quickly from a hotel window overlooking the harbour at Le Havre, this small, hazy sketch of boats under an orange sun gave an entire movement its name — a critic used the word \"impression\" to mock its unfinished look, and the label stuck as a badge of honour. Monet cared more about the fleeting effect of morning light on water than about painting the boats in any real detail."
  },
  {
    id: "water-lilies",
    title: "Water Lilies",
    painterId: "monet",
    year: "1919",
    location: "Musée Marmottan Monet, Paris",
    image: wikiImg("Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg"),
    description: "One of roughly 250 paintings Monet made of the lily pond he built at his home in Giverny, returning to it almost daily for the last three decades of his life. There is no horizon and no sky in the traditional sense — only water, reflection, and floating blooms, dissolving by his final years into passages so loose they border on abstraction."
  },
  {
    id: "woman-with-parasol",
    title: "Woman with a Parasol",
    painterId: "monet",
    year: "1875",
    location: "National Gallery of Art, Washington",
    image: wikiImg("Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg"),
    description: "A portrait of Monet's wife Camille and their son Jean on a windy hillside, painted almost entirely outdoors in a single sitting to catch the exact play of wind and light. Monet placed himself low, looking up, so mother and son are silhouetted against a rushing sky of fast, broken clouds."
  },
  {
    id: "pearl-earring",
    title: "Girl with a Pearl Earring",
    painterId: "vermeer",
    year: "c. 1665",
    location: "Mauritshuis, The Hague",
    image: wikiImg("Girl_with_a_Pearl_Earring.jpg"),
    description: "Not a commissioned portrait but what the Dutch call a \"tronie\" — a study of an imagined face and expression rather than a specific named sitter. The girl turns toward us over her shoulder, lips parted as if caught mid-word, her exotic blue-and-yellow turban and single pearl set against a background so dark it gives no clue to where she is."
  },
  {
    id: "milkmaid",
    title: "The Milkmaid",
    painterId: "vermeer",
    year: "c. 1658",
    location: "Rijksmuseum, Amsterdam",
    image: wikiImg("Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg"),
    description: "A kitchen maid pours milk in complete concentration, lit by a window whose light Vermeer rendered with tiny dots of thick paint on the bread basket, catching every crumb and glint. What could have been a plain genre scene becomes monumental — she is placed low and close in the frame, given the same quiet weight Vermeer usually reserved for wealthier sitters."
  },
  {
    id: "view-of-delft",
    title: "View of Delft",
    painterId: "vermeer",
    year: "c. 1660–1661",
    location: "Mauritshuis, The Hague",
    image: wikiImg("View_of_Delft,_by_Johannes_Vermeer.jpg"),
    description: "One of the very few outdoor cityscapes Vermeer painted, showing his home town from across the harbour under a sky of shifting cloud and sun. He used tiny beads of paint to catch the sparkle of light on roof tiles and water — a technique so precise that centuries later it drew the admiration of Marcel Proust, who wrote it was, for him, the most beautiful painting in the world."
  }
];

function paintingsByPainter(painterId) {
  return PAINTINGS.filter(function (p) { return p.painterId === painterId; });
}

function painterById(id) {
  return PAINTERS.find(function (p) { return p.id === id; });
}
