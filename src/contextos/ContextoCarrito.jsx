import { createContext, useState, useContext } from 'react'

const ContextoCarrito = createContext()

export function ProveedorCarrito({ children }) {
  const [items, setItems] = useState([])

  const agregarAlCarrito = (libro) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === libro.id)
      if (existe) {
        if (existe.cantidad >= libro.stock) return prev
        return prev.map(i => i.id === libro.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      }
      return [...prev, { ...libro, cantidad: 1 }]
    })
  }

  const quitarDelCarrito = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const modificarCantidad = (id, delta) => {
    setItems(prev => prev
      .map(i => {
        if (i.id !== id) return i
        const nueva = i.cantidad + delta
        if (nueva > i.stock) return i
        return { ...i, cantidad: nueva }
      })
      .filter(i => i.cantidad > 0)
    )
  }

  const vaciarCarrito = () => setItems([])

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)

  return (
    <ContextoCarrito.Provider value={{ items, agregarAlCarrito, quitarDelCarrito, modificarCantidad, vaciarCarrito, total }}>
      {children}
    </ContextoCarrito.Provider>
  )
}

export const useCarrito = () => useContext(ContextoCarrito)