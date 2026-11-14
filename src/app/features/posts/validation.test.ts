import { describe, expect, it } from "vitest";
import { validatePost } from "./validation";

describe("validatePost", () => {
  it("no devuelve errores con título y contenido válidos", () => {
    expect(validatePost({ title: "Hola", body: "Mundo" })).toEqual({});
  });

  it("exige título y contenido", () => {
    expect(validatePost({ title: "", body: "" })).toEqual({
      title: "El título es obligatorio.",
      body: "El contenido es obligatorio.",
    });
  });

  it("trata los espacios en blanco como vacío", () => {
    expect(validatePost({ title: "   ", body: "  " })).toEqual({
      title: "El título es obligatorio.",
      body: "El contenido es obligatorio.",
    });
  });
});
