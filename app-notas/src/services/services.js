import { createClient } from "@supabase/supabase-js";
import { cifrar, descifrar } from "./seguridad";
import { ObtenerId, ObtenerIdCategoria, SetIdCategoria } from "./autenticacion";
import { useStoreCategorias } from "./estadoGlobal";

const cliente = createClient(
  "https://egfkfiwromclttmbyupi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZmtmaXdyb21jbHR0bWJ5dXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MjEyMjcsImV4cCI6MjA0MjI5NzIyN30.yNdGDtTayCYvo1yzDVMVhaHTETuj6frMtwYfRPYXU0U"
);

export const ObtenerNotas = async () => {

  let consulta = cliente.from("notas").select("*").eq("usuario", ObtenerId())
  const idCategoria = ObtenerIdCategoria()

  if(idCategoria === "null"){
    consulta = consulta.is("categoria", null)
  }else{
    consulta = consulta.eq("categoria", ObtenerIdCategoria())
  }

  const { data: notas, error } = await consulta.order("favorito", { ascending: false }).order("modificado", { ascending: false });

  return notas?.map((x) => {
    return { ...x, nota_texto: descifrar(x.nota_texto) };
  });
};

export const ObtenerCategorias = async () => {
  const { data: lista, error } = await cliente
    .from("categorias")
    .select("*")
    .eq("usuario", ObtenerId());
  return lista;
};

export const GuardarNota = async (texto) => {
  
  const { data, error } = await cliente
    .from("notas")
    .insert([
      { usuario: ObtenerId(), nota_texto: cifrar(texto), favorito: false, categoria : JSON.parse(ObtenerIdCategoria())},
    ])
    .select();
  return data !== null;
};

export const GuardarCategoria = async ({ nombre, icono, color }) => {
  const { data, error } = await cliente
    .from("categorias")
    .insert([{ nombre, icono, color, usuario: ObtenerId() }])
    .select();

};

export const EliminarNota = async (id) => {
  const { error } = await cliente.from("notas").delete().eq("id", id);
};

export const EliminarCategoria= async () => {

  if(ObtenerIdCategoria() == "null"){
    return;
  }
  const { error } = await cliente.from("categorias").delete().eq("id", ObtenerIdCategoria());
  SetIdCategoria("null")
};


export const EstablecerFavorito = async (id, estado) => {
  const { data, error } = await cliente
    .from("notas")
    .update({ favorito: estado, modificado : new Date() })
    .eq("id", id)
    .select();
};

export const EditarNota = async (id, text) => {
  const { data, error } = await cliente
    .from("notas")
    .update({ nota_texto: cifrar(text) , modificado : new Date()  })
    .eq("id", id)
    .select();
};
