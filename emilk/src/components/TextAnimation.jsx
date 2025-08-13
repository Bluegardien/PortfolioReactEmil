// AnimatedText.jsx
export default function TextAnimation({ text, startDelay = 1200, step = 100 }) {
  const words = text.split(" ");

  return (
    <p>
      {words.map((word, index) => (
        <span
          key={index}
          className="opacity-0 translate-y-5 animate-apparaitre"
          style={{ animationDelay: `${(startDelay + index * step) / 1000}s` }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}