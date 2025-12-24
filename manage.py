#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Utilitário de linha de comandos do Django para tarefas administrativas.

Este ficheiro é o ponto de entrada para a maioria das interações com o projeto
Django a partir da linha de comandos. Ele permite executar comandos como:
- `python manage.py runserver`: Inicia o servidor de desenvolvimento.
- `python manage.py migrate`: Aplica as migrações da base de dados.
- `python manage.py createsuperuser`: Cria um utilizador administrador.
- `python manage.py shell`: Abre uma shell interativa do Python com o ambiente do projeto.

Normalmente, este ficheiro não precisa de ser editado.
"""
import os
import sys

def main():
    """
    Função principal que executa as tarefas administrativas.
    """
    # Define a variável de ambiente `DJANGO_SETTINGS_MODULE`.
    # Esta linha é crucial, pois indica ao Django onde encontrar o ficheiro
    # de configurações (settings.py) do projeto.
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.config.settings")
    
    try:
        # Tenta importar a função principal de gestão do Django.
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Se a importação falhar, levanta um erro mais descritivo.
        # Isto geralmente acontece se o Django não estiver instalado ou se o
        # ambiente virtual não estiver ativado.
        raise ImportError(
            "Não foi possível importar o Django. Tem a certeza de que está instalado e "
            "disponível na sua variável de ambiente PYTHONPATH? Esqueceu-se "
            "de ativar um ambiente virtual?"
        ) from exc
    
    # Passa os argumentos da linha de comandos (sys.argv) para o Django,
    # que irá interpretar e executar o comando solicitado.
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    # Este bloco garante que a função `main()` só é executada quando o
    # script é chamado diretamente.
    main()
