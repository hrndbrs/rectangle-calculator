const BASE_URL = "http://localhost:8000" as const;

const calculator = document.querySelector("#calculator");
const baseInput = document.querySelector("input#base");
const heightInput = document.querySelector("input#height");
const resultDisplay = document.querySelector("#result");
const errorContainer = document.querySelector("#error");

if (
  !(calculator && baseInput && heightInput && resultDisplay && errorContainer)
)
  throw new Error();

async function fetchRectangle(path: string) {
  const res = await fetch(`${BASE_URL}/${path}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.detail[0].msg);

  return data;
}

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  try {
    const size = getSize();
    const q = new URLSearchParams(size).toString();

    const [area, perimeter] = await Promise.all([
      fetchRectangle(`area?${q}`),
      fetchRectangle(`perimeter?${q}`),
    ]);

    const areaDisplay = resultDisplay.querySelector("#area");
    const perimeterDisplay = resultDisplay.querySelector("#perimeter");

    if (!(areaDisplay && perimeterDisplay))
      throw new Error("Display elements not found");

    areaDisplay.innerHTML = `${area.data} unit squared`;
    perimeterDisplay.innerHTML = `${perimeter.data} unit`;

    errorContainer.classList.add("hidden");
    resultDisplay.classList.remove("hidden");
  } catch (error) {
    if (error instanceof Error) {
      errorContainer.classList.remove("hidden");
      errorContainer.innerHTML = error.message || "Unknown Error";

      setTimeout(() => {
        errorContainer.classList.add("hidden");
      }, 3000);
    }
  }
};

const getSize = (): Record<string, string> => {
  const base = (baseInput as HTMLInputElement).value.trim();
  const height = (heightInput as HTMLInputElement).value.trim();

  if (!(+base && +height)) {
    throw new Error("Invalid Input");
  }

  return {
    base,
    height,
  };
};

calculator.addEventListener("submit", handleSubmit);
