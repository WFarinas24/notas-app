import { createClient } from "@supabase/supabase-js";
import { cifrar, descifrar } from "./seguridad";
import { ObtenerId } from "./autenticacion";

const cliente = createClient(
  "https://egfkfiwromclttmbyupi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZmtmaXdyb21jbHR0bWJ5dXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MjEyMjcsImV4cCI6MjA0MjI5NzIyN30.yNdGDtTayCYvo1yzDVMVhaHTETuj6frMtwYfRPYXU0U"
);

export const ObtenerNotas = async () => {
  const { data: notas, error } = await cliente
    .from("notas")
    .select("*")
    .eq("usuario", ObtenerId())
    .order("favorito");

    console.log(notas)
  return notas.map((x) => {
    return { ...x, nota_texto: descifrar(x.nota_texto) };
  });
};

export const GuardarNota = async (texto) => {
  const { data, error } = await cliente
    .from("notas")
    .insert([{usuario : ObtenerId(), nota_texto: cifrar(texto), favorito : false }])
    .select();

  return data;
};

export const EliminarNota = async (id) => {
  const { error } = await cliente.from("notas").delete().eq("id", id);
};

export const EstablecerFavorito = async (id, estado) => {
  const { data, error } = await cliente
    .from("notas")
    .update({ favorito: estado })
    .eq("id", id)
    .select();
};

export const EditarNota = async (id, text) => {
  const { data, error } = await cliente
    .from("notas")
    .update({ nota_texto: cifrar(text) })
    .eq("id", id)
    .select();
};
