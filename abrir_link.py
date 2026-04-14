"""Abre um link no navegador padrão.

Uso:
    python abrir_link.py https://seu-link.com/pagina
Se nenhum argumento for passado, abre o valor padrão em DEFAULT_URL.
"""

import sys
import webbrowser

# Troque pelo endereço do sistema interno quando estiver disponível
# Mantém http por padrão para evitar falha em ambientes sem HTTPS configurado
DEFAULT_URL = "http://sistema.interno.local"


def open_link(url: str) -> None:
    url = url.strip()
    # Recusa argumentos vazios para evitar chamada inválida ao browser
    if not url:
        raise ValueError("URL vazia.")
    # Garante prefixo de protocolo caso o usuário digite apenas o host
    if not url.startswith(("http://", "https://")):
        url = "http://" + url
    # new=2 tenta abrir em nova aba; retorno indica se o OS aceitou a chamada
    ok = webbrowser.open(url, new=2)
    if not ok:
        print(f"Não foi possível abrir o link: {url}")


def main() -> None:
    url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_URL
    try:
        open_link(url)
    except Exception as exc:  # Log simples para terminal
        print(f"Erro ao abrir o link: {exc}")


if __name__ == "__main__":
    main()
