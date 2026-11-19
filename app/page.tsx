'use client';

import { useState } from 'react';
import { products } from './data/products';

type CartItem = {
  id: number;
  quantity: number;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(productId: number) {
    const product = products.find((p) => p.id === productId);

    if (!product || !product.available) return;

    setCart((current) => {
      const existing = current.find((item) => item.id === productId);

      if (existing) {
        return current.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { id: productId, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function increaseQuantity(productId: number) {
    setCart((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(productId: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  function formatPrice(price: number | null) {
    if (price === null) return 'Preço em breve';

    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <main className="min-h-screen bg-[#FFFCDF] text-[#758568] overflow-x-hidden">
      {/* AVISO SUPERIOR */}
      <div className="bg-[#758568] text-[#FFFCDF] text-center px-3 py-3 text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px]">
        SEU MOMENTO DE CUIDADO COMEÇA AQUI
      </div>

      {/* CABEÇALHO */}
      <header className="border-b border-[#D39A73]/30 px-5 sm:px-8 md:px-12 py-5 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <a
            href="#inicio"
            className="text-3xl sm:text-4xl font-black tracking-tighter text-[#D39A73] shrink-0"
          >
            SOLOÁ
          </a>

          <nav className="hidden md:flex gap-10 text-sm tracking-widest">
            <a href="#inicio" className="hover:text-[#C2726F] transition">
              INÍCIO
            </a>

            <a href="#produtos" className="hover:text-[#C2726F] transition">
              PRODUTOS
            </a>

            <a href="#sobre" className="hover:text-[#C2726F] transition">
              SOBRE NÓS
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="border border-[#758568] rounded-full px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm hover:bg-[#758568] hover:text-white transition whitespace-nowrap"
            >
              <span className="hidden sm:inline">Minha sacola</span>
              <span className="sm:hidden">Sacola</span>
              {' ♡ ('}
              {cartCount}
              {')'}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              className="md:hidden text-sm border border-[#758568] rounded-full px-4 py-2.5"
            >
              {menuOpen ? 'FECHAR' : 'MENU'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-5 pt-6 pb-2 md:hidden text-sm tracking-widest border-t border-[#D39A73]/30 mt-5">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>
              INÍCIO
            </a>

            <a href="#produtos" onClick={() => setMenuOpen(false)}>
              PRODUTOS
            </a>

            <a href="#sobre" onClick={() => setMenuOpen(false)}>
              SOBRE NÓS
            </a>
          </nav>
        )}
      </header>

      {/* BANNER PRINCIPAL */}
      <section
        id="inicio"
        className="scroll-mt-6 px-5 sm:px-8 md:px-12 py-14 sm:py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-center">
          <div>
            <p className="text-[#C2726F] tracking-[4px] text-[10px] sm:text-xs mb-6 sm:mb-8">
              BELEZA • CUIDADO • VOCÊ
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.12] tracking-tight">
              Seu cuidado.
              <br />
              Seu tempo.
              <br />
              <span className="text-[#D39A73]">Sua essência.</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed max-w-md">
              Descubra uma nova forma de cuidar de você. Pequenos momentos de
              autocuidado fazem toda a diferença.
            </p>

            <a
              href="#produtos"
              className="inline-flex items-center justify-center text-center mt-8 sm:mt-10 bg-[#758568] text-[#FFFCDF] px-7 sm:px-10 py-4 sm:py-5 rounded-full text-xs sm:text-sm tracking-widest hover:bg-[#C2726F] transition w-full sm:w-auto"
            >
              CONHEÇA NOSSOS PRODUTOS →
            </a>
          </div>

          {/* ILUSTRAÇÃO PRINCIPAL */}
          <div className="relative bg-[#D39A73] rounded-[130px_130px_20px_20px] sm:rounded-[160px_160px_20px_20px] md:rounded-[180px_180px_20px_20px] min-h-[360px] sm:min-h-[440px] md:min-h-[560px] flex items-center justify-center overflow-hidden">
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-[#FFFCDF]/30 rounded-full blur-3xl" />

            <div className="relative flex items-center gap-4 sm:gap-5">
              <div className="w-24 h-48 sm:w-28 sm:h-56 bg-[#FFFCDF] rounded-t-2xl rounded-b-xl shadow-xl flex flex-col items-center justify-center">
                <div className="w-9 h-7 sm:w-10 sm:h-8 bg-[#C1CD96] rounded-sm mb-4" />

                <span className="text-[#758568] font-bold text-xl">S.</span>

                <span className="text-[#758568] text-[8px] tracking-widest mt-2">
                  SOLOÁ
                </span>
              </div>

              <div className="w-20 h-40 sm:w-24 sm:h-44 bg-[#C1CD96] rounded-t-2xl rounded-b-xl shadow-xl flex flex-col items-center justify-center">
                <div className="w-8 h-6 sm:w-9 sm:h-7 bg-[#758568] rounded-sm mb-4" />

                <span className="text-[#FFFCDF] font-bold text-xl">S.</span>

                <span className="text-[#758568] text-[8px] tracking-widest mt-2">
                  SOLOÁ
                </span>
              </div>
            </div>

            <span className="absolute bottom-7 sm:bottom-8 text-[#FFFCDF] text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px]">
              UM TEMPO PARA VOCÊ
            </span>
          </div>
        </div>
      </section>

      {/* FRASE INSTITUCIONAL */}
      <section className="bg-[#C1CD96] py-12 sm:py-14 px-5 text-center">
        <p className="text-[#758568] text-[10px] sm:text-xs tracking-[3px] mb-4">
          A BELEZA DE SE CUIDAR
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug">
          Cuidar de si também é prioridade.
        </h2>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section
        id="produtos"
        className="scroll-mt-6 px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#C2726F] text-[10px] sm:text-xs tracking-[3px] mb-4">
              ESCOLHIDOS PARA VOCÊ
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl">
              Nossos produtos
            </h2>

            <p className="mt-4 text-sm sm:text-base">
              Seu ritual de cuidado começa aqui.
            </p>
          </div>

          {/* GRID DE PRODUTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
            {products.map((product, index) => (
              <article key={product.id} className="flex flex-col">
                {/* IMAGEM COM PROPORÇÃO VERTICAL */}
                <div
                  className="aspect-[4/5] w-full rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: product.color }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#FFFCDF] text-center px-4">
                      <span className="text-4xl mb-4">✦</span>

                      <span className="text-xs tracking-[3px]">EM BREVE</span>
                    </div>
                  )}

                  {/* NUMERAÇÃO */}
                  <span className="absolute bottom-5 left-5 text-[#FFFCDF] text-xs tracking-widest drop-shadow-md">
                    0{index + 1}
                  </span>
                </div>

                {/* INFORMAÇÕES DO PRODUTO */}
                <div className="pt-5 flex flex-col flex-1">
                  <p className="text-[#C2726F] text-xs tracking-widest">
                    {product.category}
                  </p>

                  <h3 className="text-lg sm:text-xl mt-2">{product.name}</h3>

                  <p className="mt-2 text-sm">{formatPrice(product.price)}</p>

                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      disabled={!product.available}
                      className="w-full border border-[#758568] rounded-full py-4 text-xs sm:text-sm tracking-widest hover:bg-[#758568] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#758568]"
                    >
                      {product.available ? 'ADICIONAR À SACOLA' : 'EM BREVE'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE A SOLOÁ */}
      <section
        id="sobre"
        className="scroll-mt-6 bg-[#758568] text-[#FFFCDF] px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] sm:text-xs tracking-[4px] mb-6">
            UM POUCO SOBRE NÓS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-6xl leading-tight">
            Mais do que beleza,
            <br className="hidden sm:block" /> uma relação com você.
          </h2>

          <p className="max-w-2xl mx-auto mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed opacity-90">
            A SOLOÁ acredita que o autocuidado vai além da rotina. É sobre
            reservar um momento para si, reconhecer sua essência e valorizar
            cada detalhe.
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-[#FFFCDF] px-5 sm:px-8 md:px-12 py-12 sm:py-14">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#D39A73]">
            SOLOÁ
          </h2>

          <p className="mt-4 text-sm">Seu cuidado. Seu tempo. Sua essência.</p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 text-sm">
            <a href="#inicio">Início</a>
            <a href="#produtos">Produtos</a>
            <a href="#sobre">Sobre nós</a>
          </div>

          <div className="border-t border-[#D39A73]/30 mt-10 pt-6 text-xs">
            © 2026 SOLOÁ. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* SACOLA DE COMPRAS */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* FUNDO ESCURO */}
          <button
            type="button"
            aria-label="Fechar sacola"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/40 cursor-default"
          />

          {/* PAINEL LATERAL */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="relative z-10 bg-[#FFFCDF] w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
          >
            {/* CABEÇALHO DA SACOLA */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#D39A73]/30">
              <div>
                <p className="text-xs tracking-[3px] text-[#C2726F]">SOLOÁ</p>

                <h2 id="cart-title" className="text-2xl mt-1">
                  Minha sacola ({cartCount})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Fechar sacola"
                className="w-10 h-10 rounded-full border border-[#758568] hover:bg-[#758568] hover:text-white transition text-xl"
              >
                ×
              </button>
            </div>

            {/* ITENS DA SACOLA */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                /* SACOLA VAZIA */
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl text-[#D39A73] mb-5">♡</div>

                  <h3 className="text-2xl">Sua sacola está vazia</h3>

                  <p className="mt-3 text-sm max-w-xs leading-relaxed">
                    Que tal conhecer nossos produtos e encontrar seu próximo
                    momento de autocuidado?
                  </p>

                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-8 bg-[#758568] text-[#FFFCDF] px-8 py-4 rounded-full text-xs tracking-widest hover:bg-[#C2726F] transition"
                  >
                    CONTINUAR COMPRANDO
                  </button>
                </div>
              ) : (
                /* PRODUTOS DA SACOLA */
                <div className="space-y-6">
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.id);

                    if (!product) return null;

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 border-b border-[#D39A73]/30 pb-6"
                      >
                        {/* FOTO DO PRODUTO NA SACOLA */}
                        <div
                          className="w-24 h-28 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                          style={{ backgroundColor: product.color }}
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-[#FFFCDF] font-bold text-xl">
                              S.
                            </span>
                          )}
                        </div>

                        {/* INFORMAÇÕES */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] tracking-widest text-[#C2726F]">
                            {product.category}
                          </p>

                          <h3 className="font-medium mt-1">{product.name}</h3>

                          <p className="text-sm mt-2">
                            {formatPrice(product.price)}
                          </p>

                          {/* CONTROLE DE QUANTIDADE */}
                          <div className="flex items-center gap-3 mt-4">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              aria-label="Diminuir quantidade"
                              className="w-8 h-8 rounded-full border border-[#758568] hover:bg-[#758568] hover:text-white transition"
                            >
                              −
                            </button>

                            <span className="text-sm tabular-nums">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              aria-label="Aumentar quantidade"
                              className="w-8 h-8 rounded-full border border-[#758568] hover:bg-[#758568] hover:text-white transition"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-[#C2726F] underline mt-3"
                          >
                            Remover produto
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RODAPÉ DA SACOLA */}
            {cart.length > 0 && (
              <div className="border-t border-[#D39A73]/30 px-6 py-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm">Total de itens</span>

                  <span className="font-medium">{cartCount}</span>
                </div>

                <p className="text-xs leading-relaxed opacity-80">
                  Os valores e as opções de pagamento serão apresentados quando
                  os produtos reais forem cadastrados.
                </p>

                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-5 w-full bg-[#758568] text-[#FFFCDF] py-4 rounded-full text-xs tracking-widest hover:bg-[#C2726F] transition"
                >
                  CONTINUAR COMPRANDO
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
