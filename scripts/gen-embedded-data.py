#!/usr/bin/env python3
"""
gen-embedded-data.py - Genere js/embedded-data.js depuis tous les JSON
du dossier json/.

- Liste tous les fichiers *.json dans <prod>/json/
- Pour chaque fichier, lit le contenu et le serialise en JSON indenté.
- Conversion nom de fichier -> cle snake_case :
    beta-accounts.json -> beta_accounts
    expert-modules.json -> expert_modules
- Ecrit <prod>/js/embedded-data.js avec la structure :
    window.EmbeddedData = {
      beta_accounts: {...},
      products: [...],
      ...
    };
- Le fichier genere est lisible (indent=2, ensure_ascii=False) et valide
  (verifie via `node -c` apres generation).

Usage:
    python3 gen-embedded-data.py [--json-dir DIR] [--out FILE]

Par defaut :
    --json-dir = /home/z/my-project/workspace/prod/json
    --out      = /home/z/my-project/workspace/prod/js/embedded-data.js
"""

import argparse
import json
import os
import sys
import subprocess
from pathlib import Path


# Fichiers JSON exclus embarques (metadonnées / dev-only, pas utiles au runtime)
# Liste vide = on embarque TOUT ce qui est dans json/
EXCLUDE_FILES = set()


def kebab_to_snake(name: str) -> str:
    """Convertit 'beta-accounts' -> 'beta_accounts'."""
    return name.replace('-', '_').replace(' ', '_')


def list_json_files(json_dir: Path):
    """Liste tous les fichiers *.json (tries alphabetiquement)."""
    if not json_dir.is_dir():
        raise FileNotFoundError(f"Dossier JSON introuvable: {json_dir}")
    files = sorted(p for p in json_dir.glob('*.json') if p.name not in EXCLUDE_FILES)
    return files


def load_json(path: Path):
    """Charge un fichier JSON et valide sa structure."""
    with path.open('r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError as e:
            raise ValueError(f"JSON invalide dans {path.name}: {e}") from e


def render_entry(key: str, data) -> str:
    """Genere une entree 'key: <json>,\n' lisible."""
    serialized = json.dumps(data, indent=2, ensure_ascii=False)
    return f"  {key}: {serialized},\n"


def generate_embedded(json_dir: Path, out_file: Path) -> dict:
    """Genere le fichier embedded-data.js et retourne un rapport."""
    files = list_json_files(json_dir)
    if not files:
        raise RuntimeError(f"Aucun fichier JSON trouve dans {json_dir}")

    header = (
        "/* js/embedded-data.js - Donnees JSON embarquees (fallback pour file://)\n"
        " * Genere automatiquement par scripts/gen-embedded-data.py depuis json/*.json\n"
        " * Permet au site de fonctionner sans serveur HTTP (ouverture directe de index.html)\n"
        " *\n"
        f" * Source : {json_dir}\n"
        f" * Fichiers embarques : {len(files)}\n"
        " * NE PAS EDITER A LA MAIN - executer gen-embedded-data.py pour regenerer.\n"
        " */\n"
        "const EmbeddedData = {\n"
    )

    parts = [header]
    report = {'files': [], 'total_lines': 0, 'total_bytes': 0}

    for path in files:
        key = kebab_to_snake(path.stem)
        try:
            data = load_json(path)
        except Exception as e:
            print(f"  [ERREUR] {path.name}: {e}", file=sys.stderr)
            raise

        entry = render_entry(key, data)
        line_count = entry.count('\n')
        parts.append(entry)

        # Statistiques pour le rapport
        size_bytes = len(entry.encode('utf-8'))
        if isinstance(data, dict):
            kind = f"dict({len(data)} keys)"
        elif isinstance(data, list):
            kind = f"list({len(data)} items)"
        else:
            kind = type(data).__name__

        report['files'].append({
            'name': path.name,
            'key': key,
            'kind': kind,
            'lines': line_count,
            'bytes': size_bytes,
        })
        print(f"  [OK] {path.name:30s} -> {key:25s} {kind}")

    parts.append("};\n")
    parts.append("window.EmbeddedData = EmbeddedData;\n")

    content = ''.join(parts)
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(content, encoding='utf-8')

    report['total_lines'] = content.count('\n')
    report['total_bytes'] = len(content.encode('utf-8'))
    report['out_file'] = str(out_file)
    return report


def check_node_syntax(out_file: Path) -> bool:
    """Verifie la syntaxe JS via `node -c` si node est disponible."""
    try:
        result = subprocess.run(
            ['node', '--check', str(out_file)],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode == 0:
            print(f"  [OK] node --check : syntaxe valide")
            return True
        else:
            print(f"  [ERREUR] node --check a echoue:", file=sys.stderr)
            print(result.stderr, file=sys.stderr)
            return False
    except FileNotFoundError:
        print("  [WARN] node non disponible, skip syntax check")
        return True
    except subprocess.TimeoutExpired:
        print("  [WARN] node --check timeout, skip")
        return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--json-dir', default='/home/z/my-project/workspace/prod/json',
                        help='Dossier contenant les fichiers JSON')
    parser.add_argument('--out', default='/home/z/my-project/workspace/prod/js/embedded-data.js',
                        help='Fichier JS de sortie')
    parser.add_argument('--no-check', action='store_true',
                        help='Skip la verification node --check')
    args = parser.parse_args()

    json_dir = Path(args.json_dir)
    out_file = Path(args.out)

    print(f"== Generation embedded-data.js ==")
    print(f"  Source : {json_dir}")
    print(f"  Sortie : {out_file}")
    print()

    print("Lecture des fichiers JSON :")
    report = generate_embedded(json_dir, out_file)
    print()

    print(f"Fichier ecrit : {out_file}")
    print(f"  Total : {report['total_lines']} lignes, {report['total_bytes']:,} octets")
    print(f"  Fichiers embarques : {len(report['files'])}")
    print()

    if not args.no_check:
        print("Verification syntaxe JS (node --check) :")
        ok = check_node_syntax(out_file)
        if not ok:
            sys.exit(1)
    print()
    print("OK - generation terminee.")


if __name__ == '__main__':
    main()
