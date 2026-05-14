import React, { useMemo, useState } from "react";
import { BookOpen, PlusCircle, Library, PenLine, Copy, Trash2, Search, CheckCircle2, Users, MapPin, Brain, Star, ListChecks } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  level: string;
  genre: string;
  description: string;
  themes: string;
  characters: string;
};

type ChapterGuide = {
  part: string;
  focus: string;
  guidance: string;
  questions: string[];
};

type VocabWord = {
  word: string;
  meaning: string;
  example: string;
};

const refugeeChapterGuides: ChapterGuide[] = [
  {
    part: "Before Reading",
    focus: "Understand what a refugee is",
    guidance: "Before starting Refugee, think about why a family might have to leave home quickly. This book follows three young people in different time periods. While reading, pay attention to what they lose, what they carry, and what gives them hope.",
    questions: ["What does the word refugee mean?", "Why might someone be forced to leave home?", "What would be hardest for you to leave behind?"]
  },
  {
    part: "Josef: Early Chapters",
    focus: "Fear and growing up too fast",
    guidance: "Josef lives in Germany in 1938. His family is Jewish, and the danger around them is increasing. Watch how Josef begins as a child but is forced to act older because his family is under threat.",
    questions: ["What signs show that Josef's world is becoming unsafe?", "How does Josef's family respond to danger?", "Why does Josef feel pressure to act like an adult?"]
  },
  {
    part: "Isabel: Early Chapters",
    focus: "Hope, music, and family",
    guidance: "Isabel lives in Cuba in 1994. Her family struggles with limited freedom and difficult living conditions. Music is important to Isabel because it connects her to family, culture, and hope.",
    questions: ["What does Isabel love about her home?", "Why does her family consider leaving Cuba?", "How does music help Isabel express herself?"]
  },
  {
    part: "Mahmoud: Early Chapters",
    focus: "War and invisibility",
    guidance: "Mahmoud lives in Syria in 2015 during war. He learns that being noticed can be dangerous, so he often tries to stay invisible. Pay attention to how the author shows fear in everyday life.",
    questions: ["Why does Mahmoud try not to be noticed?", "How has war changed normal life for his family?", "What does Mahmoud understand that many adults around him may not?"]
  },
  {
    part: "The Decision to Leave",
    focus: "When home is no longer safe",
    guidance: "All three families reach a point where staying is more dangerous than leaving. Refugees often do not leave because they want adventure; they leave because survival requires it.",
    questions: ["What finally pushes each family to leave?", "What risks do they face by leaving?", "What risks do they face by staying?"]
  },
  {
    part: "The Journey Begins",
    focus: "Uncertainty and courage",
    guidance: "Each journey begins with hope, but also with fear. The families must trust boats, strangers, plans, and luck. Track how each child reacts when things do not go as expected.",
    questions: ["What does courage look like for Josef, Isabel, and Mahmoud?", "Who helps them at the beginning of the journey?", "What is one moment where hope and fear appear together?"]
  },
  {
    part: "On the Water",
    focus: "Water as freedom and danger",
    guidance: "Water appears in different ways in the novel. For some characters, crossing water means a chance at freedom. But water also becomes dangerous, unpredictable, and frightening.",
    questions: ["How is water connected to hope?", "How is water connected to danger?", "Compare Josef's and Isabel's journeys by water."]
  },
  {
    part: "Borders and Rules",
    focus: "Who gets allowed in?",
    guidance: "The book shows that safety is not only about reaching another country. Refugees must also face borders, laws, papers, officials, and public opinion.",
    questions: ["Why are borders so important in the book?", "How do laws and rules affect families?", "What does the book suggest about fairness?"]
  },
  {
    part: "Family Sacrifice",
    focus: "Love during impossible choices",
    guidance: "Many characters must make painful choices to protect the people they love. Watch for moments when someone gives up safety, comfort, or opportunity for another person.",
    questions: ["Who makes a sacrifice in the story?", "Why is that sacrifice important?", "How does family love shape each character's decisions?"]
  },
  {
    part: "Being Seen",
    focus: "Mahmoud's big idea",
    guidance: "One of the strongest ideas in the book is whether refugees are ignored or truly seen. Mahmoud's story helps readers think about visibility, voice, and human dignity.",
    questions: ["What does it mean to be invisible in this book?", "When can being invisible feel safe?", "When is it important to be seen?"]
  },
  {
    part: "How the Stories Connect",
    focus: "Three timelines, one message",
    guidance: "The three stories happen in different years, but they are connected by experience, theme, and human choices. The author uses this structure to show that refugee stories are not only one country's story or one time period's story.",
    questions: ["What do Josef, Isabel, and Mahmoud have in common?", "How are their situations different?", "Why did the author choose three storylines instead of one?"]
  },
  {
    part: "After Reading",
    focus: "Theme and responsibility",
    guidance: "After finishing the book, think about what Refugee asks from the reader. The book is not only about the past. It asks how people today should respond when families need safety.",
    questions: ["What is the most important lesson of the book?", "Which character changed you the most as a reader?", "What responsibility do people have toward refugees?"]
  }
];

const refugeeVocab: VocabWord[] = [
  { word: "refugee", meaning: "A person forced to leave home because of war, danger, or persecution.", example: "The family became refugees when staying home was no longer safe." },
  { word: "persecution", meaning: "Cruel or unfair treatment because of identity, religion, race, or beliefs.", example: "Josef's family faces persecution because they are Jewish." },
  { word: "asylum", meaning: "Protection given by a country to someone escaping danger.", example: "Many refugees hope to receive asylum in a safer country." },
  { word: "border", meaning: "A line between countries or regions.", example: "A border can decide whether a family reaches safety." },
  { word: "deport", meaning: "To force someone to leave a country.", example: "Refugees may fear being deported back to danger." },
  { word: "dictatorship", meaning: "A government where one ruler or group has strong control and people have limited freedom.", example: "Isabel's family lives under a government with strict control." },
  { word: "resilience", meaning: "The ability to keep going after hardship.", example: "The three children show resilience during their journeys." },
  { word: "trauma", meaning: "Deep emotional pain after a frightening or harmful experience.", example: "War and escape can leave trauma on families." },
  { word: "identity", meaning: "Who someone is, including culture, family, beliefs, and personal history.", example: "Each character tries to hold onto identity while leaving home." },
  { word: "sacrifice", meaning: "Giving up something important for someone or something else.", example: "Family members make sacrifices to protect each other." },
  { word: "inference", meaning: "A smart guess based on evidence from the text.", example: "Readers can make an inference about Mahmoud's fear from his actions." },
  { word: "theme", meaning: "A big message or lesson in a story.", example: "One theme of Refugee is that courage can appear in many forms." }
];

const starterBook: Book = {
  id: "refugee",
  title: "Refugee",
  author: "Alan Gratz",
  level: "Middle School",
  genre: "Historical Fiction",
  description: "Refugee follows three young people from three different historical moments: Josef, a Jewish boy escaping Nazi Germany in 1938; Isabel, a Cuban girl leaving Cuba in 1994; and Mahmoud, a Syrian boy fleeing war in 2015. Their stories connect through danger, courage, family, survival, and the search for a safe home.",
  themes: "courage, family, survival, identity, home, being seen, responsibility, hope",
  characters: "Josef Landau, Isabel Fernandez, Mahmoud Bishara, and their families"
};

const sections = ["Book Overview", "Chapter Guide", "Character Tracker", "Vocabulary", "Theme Tracker", "Discussion Questions", "Quiz", "Final Reflection"];

function generateMarkdown(book: Book) {
  const vocabText = book.id === "refugee"
    ? refugeeVocab.map((v) => "- **" + v.word + "**: " + v.meaning + " Example: " + v.example).join("\\n")
    : "- Add vocabulary words here.";

  const chapterText = book.id === "refugee"
    ? refugeeChapterGuides.map((c, index) => {
        return [
          "### " + (index + 1) + ". " + c.part,
          "**Focus:** " + c.focus,
          c.guidance,
          "Questions:",
          ...c.questions.map((q) => "- " + q),
          ""
        ].join("\\n");
      }).join("\\n")
    : "Add chapter or reading-session guides here.";

  return [
    "# " + book.title + " Reading Comprehension Guide",
    "",
    "**Author:** " + book.author,
    "**Level:** " + book.level,
    "**Genre:** " + book.genre,
    "",
    "## 1. Book Overview",
    book.description,
    "",
    "## 2. Chapter-by-Chapter Reading Guide",
    chapterText,
    "",
    "## 3. Character Tracker",
    "Main characters: " + book.characters,
    "",
    "| Character | What they want | Problem they face | How they change | Evidence |",
    "|---|---|---|---|---|",
    "| Josef | Safety for his family | Nazi persecution | Forced to mature quickly | Add evidence |",
    "| Isabel | Freedom and hope | Dangerous escape from Cuba | Learns courage through family and music | Add evidence |",
    "| Mahmoud | Safety and dignity | War and displacement | Learns the importance of being seen | Add evidence |",
    "",
    "## 4. Vocabulary Builder",
    vocabText,
    "",
    "## 5. Discussion Questions",
    "1. Why does the author tell three stories instead of one?",
    "2. Which character shows the most courage? Explain with evidence.",
    "3. How does the idea of home change throughout the book?",
    "4. What does the book teach about being seen or ignored?",
    "5. What responsibility do people have toward refugees?",
    "",
    "## 6. Final Reflection Paragraph Starter",
    "Refugee by Alan Gratz is about __________. The character who affected me most was __________ because __________. One important theme is __________. The author shows this when __________. This book teaches readers that __________."
  ].join("\\n");
}

export default function App() {
  const [books, setBooks] = useState<Book[]>([starterBook]);
  const [selectedId, setSelectedId] = useState("refugee");
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    level: "Middle School",
    genre: "",
    description: "",
    themes: "",
    characters: ""
  });

  const selectedBook = books.find((b) => b.id === selectedId) || starterBook;
  const markdown = useMemo(() => generateMarkdown(selectedBook), [selectedBook]);
  const filtered = books.filter((b) => (b.title + b.author).toLowerCase().includes(query.toLowerCase()));

  const addBook = () => {
    if (!form.title.trim()) return;
    const newBook: Book = { id: Date.now().toString(), ...form };
    setBooks([newBook, ...books]);
    setSelectedId(newBook.id);
    setTab("overview");
    setForm({ title: "", author: "", level: "Middle School", genre: "", description: "", themes: "", characters: "" });
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
  };

  const toggleDone = (section: string) => {
    setDone((prev) => prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc,#e0f2fe)", color: "#0f172a", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ background: "white", borderRadius: 24, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,.06)", marginBottom: 24 }}>
          <h1 style={{ fontSize: 42, margin: 0 }}>English Reading and Comprehension App</h1>
          <p style={{ fontSize: 18, color: "#475569", maxWidth: 880 }}>A student-friendly reading app for comprehension, vocabulary, discussion answers, chapter notes, and final reflections. Default book: Refugee by Alan Gratz.</p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            ["library", "Books", Library],
            ["add", "Add Book", PlusCircle],
            ["overview", "Overview", BookOpen],
            ["chapters", "Chapter Guide", ListChecks],
            ["vocab", "Vocabulary", Search],
            ["questions", "Questions", Brain],
            ["markdown", "Markdown", Copy],
            ["notes", "Notes", PenLine]
          ].map(([key, label, Icon]: any) => (
            <button key={key} onClick={() => setTab(key)} style={{ border: "none", background: tab === key ? "#0f172a" : "white", color: tab === key ? "white" : "#0f172a", borderRadius: 12, padding: "12px 16px", cursor: "pointer", boxShadow: "0 1px 5px rgba(0,0,0,.06)" }}>
              <Icon size={16} style={{ verticalAlign: "middle", marginRight: 6 }} /> {label}
            </button>
          ))}
        </div>

        {tab === "library" && (
          <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search books..." style={{ width: "100%", padding: 14, borderRadius: 14, border: "1px solid #cbd5e1", marginBottom: 16 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
              {filtered.map((book) => (
                <div key={book.id} style={{ background: "white", borderRadius: 18, padding: 22, boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}>
                  <h2>{book.title}</h2>
                  <p style={{ color: "#64748b" }}>by {book.author}</p>
                  <p>{book.description}</p>
                  <button onClick={() => { setSelectedId(book.id); setTab("overview"); }} style={{ background: "#0f172a", color: "white", border: "none", borderRadius: 10, padding: "10px 14px", marginRight: 8 }}>Open</button>
                  {book.id !== "refugee" && <button onClick={() => setBooks(books.filter((b) => b.id !== book.id))} style={{ background: "#fee2e2", border: "none", borderRadius: 10, padding: "10px 14px" }}><Trash2 size={16} /></button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "add" && (
          <div style={{ background: "white", borderRadius: 18, padding: 24 }}>
            <h2>Add a New Book</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
              {Object.keys(form).map((key) => (
                <input key={key} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key} style={{ borderRadius: 12, border: "1px solid #cbd5e1", padding: 12 }} />
              ))}
            </div>
            <button onClick={addBook} style={{ marginTop: 16, background: "#0f172a", color: "white", border: "none", borderRadius: 12, padding: "12px 18px" }}>Generate Book Guide</button>
          </div>
        )}

        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 18, padding: 24 }}>
              <h2 style={{ fontSize: 32 }}>{selectedBook.title}</h2>
              <p style={{ color: "#64748b" }}>{selectedBook.author} · {selectedBook.genre} · {selectedBook.level}</p>
              <p style={{ fontSize: 18, lineHeight: 1.7 }}>{selectedBook.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 18 }}>
                <InfoCard icon={<Users />} title="Main Characters" text={selectedBook.characters} color="#eff6ff" />
                <InfoCard icon={<Star />} title="Major Themes" text={selectedBook.themes} color="#fff7ed" />
                <InfoCard icon={<MapPin />} title="Setting" text="Germany 1938, Cuba 1994, Syria 2015, and refugee journeys across borders." color="#f0fdf4" />
                <InfoCard icon={<Brain />} title="Reading Goal" text="Track how three different stories connect through the shared experience of leaving home to find safety." color="#faf5ff" />
              </div>
            </div>
            <div style={{ background: "white", borderRadius: 18, padding: 20 }}>
              <h3>Progress Checklist</h3>
              {sections.map((section) => (
                <button key={section} onClick={() => toggleDone(section)} style={{ display: "flex", justifyContent: "space-between", width: "100%", border: "none", background: "#f8fafc", borderRadius: 12, padding: 12, marginBottom: 10 }}>
                  {section}<CheckCircle2 size={18} color={done.includes(section) ? "green" : "#94a3b8"} />
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "chapters" && (
          <div style={{ display: "grid", gap: 16 }}>
            {selectedBook.id === "refugee" ? refugeeChapterGuides.map((c, index) => (
              <div key={c.part} style={{ background: "white", borderRadius: 18, padding: 24 }}>
                <h2>{index + 1}. {c.part}</h2>
                <p style={{ color: "#1d4ed8", fontWeight: "bold" }}>Focus: {c.focus}</p>
                <p style={{ lineHeight: 1.7 }}>{c.guidance}</p>
                <div style={{ background: "#f8fafc", borderRadius: 14, padding: 16 }}>
                  <b>Reading Questions</b>
                  <ul>{c.questions.map((q) => <li key={q}>{q}</li>)}</ul>
                </div>
              </div>
            )) : <div style={{ background: "white", borderRadius: 18, padding: 24 }}>Use the Markdown tab to create a guide for this book.</div>}
          </div>
        )}

        {tab === "vocab" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
            {(selectedBook.id === "refugee" ? refugeeVocab : []).map((v) => (
              <div key={v.word} style={{ background: "white", borderRadius: 18, padding: 20 }}>
                <h2>{v.word}</h2>
                <p>{v.meaning}</p>
                <p style={{ background: "#eff6ff", borderRadius: 12, padding: 12 }}>Example: {v.example}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "questions" && (
          <div style={{ background: "white", borderRadius: 18, padding: 24 }}>
            <h2>Discussion Questions and Quiz</h2>
            <ol>
              <li>Why does Alan Gratz tell three stories instead of one?</li>
              <li>How does each character show courage in a different way?</li>
              <li>What does the novel teach about the meaning of home?</li>
              <li>How do borders, rules, and governments affect families?</li>
              <li>What does Mahmoud's story teach about being seen?</li>
            </ol>
          </div>
        )}

        {tab === "markdown" && (
          <div style={{ background: "white", borderRadius: 18, padding: 24 }}>
            <button onClick={copyMarkdown} style={{ background: "#0f172a", color: "white", border: "none", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>Copy Markdown</button>
            <pre style={{ whiteSpace: "pre-wrap", background: "#020617", color: "#f8fafc", padding: 18, borderRadius: 16, maxHeight: 650, overflow: "auto" }}>{markdown}</pre>
          </div>
        )}

        {tab === "notes" && (
          <div style={{ background: "white", borderRadius: 18, padding: 24 }}>
            <h2>My Reading Notes</h2>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ minHeight: 360, width: "100%", borderRadius: 12, border: "1px solid #cbd5e1", padding: 16 }} placeholder="Today I read... I noticed... A question I have is... Evidence I found..." />
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text, color }: { icon: React.ReactNode; title: string; text: string; color: string }) {
  return (
    <div style={{ background: color, borderRadius: 16, padding: 18 }}>
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
