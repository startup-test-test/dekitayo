#!/usr/bin/env python3
"""
全社のキーワード分析データを1つのHTMLファイルに統合するスクリプト
"""

import csv
import os
import unicodedata
from pathlib import Path

# 設定
BASE_DIR = Path("/workspaces/dekitayo/SEO")
OUTPUT_FILE = BASE_DIR / "キーワード分析_統合.html"

# 企業データ定義
COMPANIES = {
    "できたよ": {
        "name": "できたよ！",
        "color": "#FF9F43",
        "icon": "🎯",
        "type": "self",
        "keywords_csv": None,  # キーワード調査から集約
    },
    "コエテコ": {
        "name": "コエテコ",
        "color": "#667eea",
        "icon": "🎓",
        "type": "competitor",
        "keywords_csv": "コエテコ/キーワード.csv",
    },
    "リタリコ": {
        "name": "リタリコワンダー",
        "color": "#00BCD4",
        "icon": "🔍",
        "type": "competitor",
        "keywords_csv": "リタリコ/リタリコ_キーワード.csv",
    },
    "QUREO": {
        "name": "QUREO",
        "color": "#ab47bc",
        "icon": "🏫",
        "type": "competitor",
        "keywords_csv": "QUREO/qureo_キーワード.csv",
    },
    "TechKids": {
        "name": "TechKids School",
        "color": "#ff9800",
        "icon": "🚀",
        "type": "competitor",
        "keywords_csv": "TechKids/techkids_キーワード.csv",
    },
    "デジタネ": {
        "name": "デジタネ",
        "color": "#26a69a",
        "icon": "🎮",
        "type": "competitor",
        "keywords_csv": "デジタネ/デジタネ_キーワード.csv",
    },
}

# キーワード調査カテゴリ（できたよ！用）
KEYWORD_CATEGORIES = [
    ("小学生", "🎒"),
    ("プログラミング", "💻"),
    ("自己肯定感", "💜"),
    ("発達障害", "🧩"),
    ("ゲーム", "🎮"),
    ("キッズ", "👶"),
    ("子供", "👧"),
    ("自分", "🪞"),
    ("スクラッチ", "🐱"),
    ("ロブロックス", "🎲"),
    ("マインクラフト", "⛏️"),
    ("unity", "🎮"),
    ("非認知能力", "🧠"),
    ("steam教育", "🔬"),
]


def normalize_path(path):
    """MacのNFD問題に対応"""
    return unicodedata.normalize('NFC', str(path))


def read_csv_utf16(filepath):
    """UTF-16 CSVを読み込む（ラッコキーワード形式）"""
    rows = []
    try:
        with open(filepath, 'r', encoding='utf-16') as f:
            reader = csv.DictReader(f, delimiter='\t')
            for row in reader:
                rows.append(row)
    except:
        try:
            with open(filepath, 'r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    rows.append(row)
        except:
            pass
    return rows


def load_competitor_keywords(company_key):
    """競合のキーワードデータを読み込む"""
    info = COMPANIES[company_key]
    csv_path = BASE_DIR / info["keywords_csv"]

    if not csv_path.exists():
        # NFD対応
        for p in csv_path.parent.glob("*"):
            if normalize_path(p.name) == normalize_path(csv_path.name):
                csv_path = p
                break

    rows = read_csv_utf16(csv_path)

    keywords = []
    for row in rows:
        kw = row.get("キーワード", row.get("keyword", ""))
        vol = row.get("月間検索数", row.get("volume", "0"))

        try:
            vol_int = int(str(vol).replace(",", ""))
        except:
            vol_int = 0

        keywords.append({
            "keyword": kw,
            "volume": vol_int,
            "source": company_key,
        })

    return keywords


def load_dekitayo_keywords():
    """できたよ！のキーワード調査データを読み込む"""
    keywords = []
    keyword_dir = BASE_DIR / "キーワード調査"

    for cat_name, icon in KEYWORD_CATEGORIES:
        csv_path = keyword_dir / f"{cat_name}.csv"

        if not csv_path.exists():
            for p in keyword_dir.glob("*"):
                if normalize_path(p.stem) == normalize_path(cat_name):
                    csv_path = p
                    break

        if csv_path.exists():
            rows = read_csv_utf16(csv_path)
            for row in rows:
                kw = row.get("キーワード", row.get("keyword", ""))
                vol = row.get("月間検索数", row.get("volume", "0"))

                try:
                    vol_int = int(str(vol).replace(",", ""))
                except:
                    vol_int = 0

                keywords.append({
                    "keyword": kw,
                    "volume": vol_int,
                    "category": cat_name,
                    "icon": icon,
                    "source": "できたよ",
                })

    return keywords


def format_number(n):
    """数値をフォーマット"""
    if n >= 10000:
        return f"{n/10000:.1f}万"
    elif n >= 1000:
        return f"{n:,}"
    return str(n)


def generate_html(all_data):
    """統合HTMLを生成"""

    html = '''<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>キーワード分析 - 統合ダッシュボード</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", sans-serif; background: #f0f2f5; color: #333; }

        .container { display: flex; min-height: 100vh; }

        /* サイドバー */
        .sidebar { width: 280px; background: #1a1a2e; color: white; position: fixed; height: 100vh; overflow-y: auto; }
        .sidebar-header { padding: 20px; background: linear-gradient(135deg, #16213e 0%, #1a1a2e 100%); border-bottom: 1px solid #2a2a4e; }
        .sidebar-header h1 { font-size: 20px; margin-bottom: 5px; }
        .sidebar-header p { font-size: 11px; opacity: 0.6; }

        .nav-section { padding: 10px 0; }
        .nav-title { padding: 8px 20px; font-size: 10px; color: #8892b0; text-transform: uppercase; letter-spacing: 1px; }
        .nav-item { display: flex; align-items: center; padding: 10px 20px; color: #ccd6f6; text-decoration: none; font-size: 13px; cursor: pointer; transition: all 0.2s; border-left: 3px solid transparent; }
        .nav-item:hover { background: #2a2a4e; }
        .nav-item.active { background: #2a2a4e; border-left-color: var(--accent-color, #64ffda); }
        .nav-item .icon { margin-right: 10px; font-size: 16px; }
        .nav-item .badge { margin-left: auto; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 10px; font-size: 10px; }
        .nav-divider { height: 1px; background: #2a2a4e; margin: 10px 20px; }

        /* メインコンテンツ */
        .main { margin-left: 280px; flex: 1; padding: 20px; }

        /* ページ切り替え */
        .page { display: none; }
        .page.active { display: block; }

        /* ヘッダーカード */
        .header-card { background: linear-gradient(135deg, var(--primary-color, #667eea) 0%, var(--secondary-color, #764ba2) 100%); color: white; padding: 25px 30px; border-radius: 12px; margin-bottom: 20px; }
        .header-card h2 { font-size: 22px; margin-bottom: 8px; }
        .header-card p { opacity: 0.9; font-size: 13px; }

        /* 統計グリッド */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .stat-card { background: white; padding: 18px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .stat-card h4 { color: #666; font-size: 11px; margin-bottom: 6px; text-transform: uppercase; }
        .stat-card .value { font-size: 26px; font-weight: bold; color: var(--accent-color, #667eea); }
        .stat-card .sub { font-size: 11px; color: #999; margin-top: 4px; }

        /* テーブルコンテナ */
        .table-container { background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden; }
        .table-header { padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .table-header h3 { font-size: 15px; color: #333; }
        .search-box { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; width: 250px; font-size: 13px; }

        .table-wrapper { overflow-x: auto; max-height: 600px; overflow-y: auto; }

        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background: var(--accent-color, #667eea); color: white; padding: 12px 14px; text-align: left; position: sticky; top: 0; cursor: pointer; font-size: 11px; white-space: nowrap; }
        th:hover { filter: brightness(1.1); }
        td { padding: 10px 14px; border-bottom: 1px solid #f0f0f0; }
        tr:hover { background: #f8f9fa; }

        .col-no { width: 40px; text-align: center; color: #999; font-size: 11px; }
        .col-kw { min-width: 200px; font-weight: 500; }
        .col-vol { text-align: right; font-weight: 600; color: #333; }
        .col-cat { }

        /* バッジ */
        .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 9px; font-weight: 600; }
        .badge-cat { background: #e8f5e9; color: #2e7d32; }
        .badge-game { background: #e3f2fd; color: #1565c0; }
        .badge-edu { background: #fff3e0; color: #e65100; }
        .badge-dev { background: #fce4ec; color: #c2185b; }

        /* 企業切り替えタブ */
        .company-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .company-tab { padding: 10px 18px; background: white; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
        .company-tab:hover { border-color: var(--tab-color, #667eea); }
        .company-tab.active { background: var(--tab-color, #667eea); color: white; border-color: var(--tab-color, #667eea); }
        .company-tab .count { font-size: 11px; opacity: 0.8; }

        /* サマリーページ */
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .summary-card { background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .summary-card h3 { font-size: 14px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--accent-color, #667eea); }
        .summary-card .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
        .summary-card .item:last-child { border-bottom: none; }
        .summary-card .item .label { color: #666; }
        .summary-card .item .value { font-weight: 600; }

        /* レスポンシブ */
        @media (max-width: 768px) {
            .sidebar { width: 100%; height: auto; position: relative; }
            .main { margin-left: 0; }
            .container { flex-direction: column; }
        }
    </style>
</head>
<body>
<div class="container">
    <aside class="sidebar">
        <div class="sidebar-header">
            <h1>📊 キーワード分析</h1>
            <p>統合ダッシュボード</p>
        </div>
        <nav>
            <div class="nav-section">
                <div class="nav-title">概要</div>
                <div class="nav-item active" onclick="showPage('overview')" style="--accent-color: #64ffda;">
                    <span class="icon">📈</span>サマリー
                </div>
            </div>

            <div class="nav-divider"></div>

            <div class="nav-section">
                <div class="nav-title">自社調査</div>
                <div class="nav-item" onclick="showPage('dekitayo')" style="--accent-color: #FF9F43;">
                    <span class="icon">🎯</span>できたよ！
                    <span class="badge">''' + str(len(all_data.get("できたよ", []))) + '''</span>
                </div>
            </div>

            <div class="nav-divider"></div>

            <div class="nav-section">
                <div class="nav-title">競合分析</div>
'''

    # 競合のナビゲーション項目
    for key, info in COMPANIES.items():
        if info["type"] == "competitor":
            count = len(all_data.get(key, []))
            html += f'''                <div class="nav-item" onclick="showPage('{key}')" style="--accent-color: {info['color']};">
                    <span class="icon">{info['icon']}</span>{info['name']}
                    <span class="badge">{count}</span>
                </div>
'''

    html += '''            </div>
        </nav>
    </aside>

    <main class="main">
'''

    # サマリーページ
    total_keywords = sum(len(v) for v in all_data.values())
    total_volume = sum(sum(kw["volume"] for kw in v) for v in all_data.values())

    html += f'''        <!-- サマリーページ -->
        <div id="page-overview" class="page active">
            <div class="header-card" style="--primary-color: #667eea; --secondary-color: #764ba2;">
                <h2>キーワード分析 統合ダッシュボード</h2>
                <p>自社調査 + 競合5社の分析データを統合</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <h4>総キーワード数</h4>
                    <div class="value">{total_keywords:,}</div>
                </div>
                <div class="stat-card">
                    <h4>総月間検索数</h4>
                    <div class="value">{format_number(total_volume)}</div>
                </div>
                <div class="stat-card">
                    <h4>分析企業数</h4>
                    <div class="value">{len(all_data)}</div>
                </div>
            </div>

            <div class="summary-grid">
                <div class="summary-card" style="--accent-color: #FF9F43;">
                    <h3>🎯 自社調査（できたよ！）</h3>
'''

    # できたよのカテゴリ別集計
    dekitayo_data = all_data.get("できたよ", [])
    category_counts = {}
    for kw in dekitayo_data:
        cat = kw.get("category", "その他")
        if cat not in category_counts:
            category_counts[cat] = {"count": 0, "volume": 0}
        category_counts[cat]["count"] += 1
        category_counts[cat]["volume"] += kw["volume"]

    for cat, data in sorted(category_counts.items(), key=lambda x: x[1]["volume"], reverse=True)[:8]:
        html += f'''                    <div class="item">
                        <span class="label">{cat}</span>
                        <span class="value">{data["count"]:,}件 / {format_number(data["volume"])}</span>
                    </div>
'''

    html += '''                </div>

                <div class="summary-card" style="--accent-color: #667eea;">
                    <h3>🔍 競合分析</h3>
'''

    # 競合の集計
    for key, info in COMPANIES.items():
        if info["type"] == "competitor":
            comp_data = all_data.get(key, [])
            comp_volume = sum(kw["volume"] for kw in comp_data)
            html += f'''                    <div class="item">
                        <span class="label">{info["icon"]} {info["name"]}</span>
                        <span class="value">{len(comp_data):,}件 / {format_number(comp_volume)}</span>
                    </div>
'''

    html += '''                </div>
            </div>
        </div>
'''

    # 各企業のページ
    for key, info in COMPANIES.items():
        data = all_data.get(key, [])
        total_vol = sum(kw["volume"] for kw in data)
        page_id = key

        if key == "できたよ":
            page_id = "dekitayo"

        html += f'''
        <!-- {info["name"]}ページ -->
        <div id="page-{page_id}" class="page">
            <div class="header-card" style="--primary-color: {info['color']}; --secondary-color: {info['color']};">
                <h2>{info['icon']} {info["name"]} キーワード分析</h2>
                <p>{len(data):,}キーワード / 月間検索数 {format_number(total_vol)}</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card" style="--accent-color: {info['color']};">
                    <h4>キーワード数</h4>
                    <div class="value">{len(data):,}</div>
                </div>
                <div class="stat-card" style="--accent-color: {info['color']};">
                    <h4>月間検索数</h4>
                    <div class="value">{format_number(total_vol)}</div>
                </div>
            </div>

            <div class="table-container">
                <div class="table-header">
                    <h3>キーワード一覧</h3>
                    <input type="text" class="search-box" placeholder="キーワードを検索..." onkeyup="filterTable(this, '{page_id}')">
                </div>
                <div class="table-wrapper">
                    <table id="table-{page_id}">
                        <thead>
                            <tr>
                                <th class="col-no">#</th>
                                <th onclick="sortTable('{page_id}', 1)">キーワード</th>
                                <th onclick="sortTable('{page_id}', 2)">月間検索数</th>
'''

        if key == "できたよ":
            html += '''                                <th>カテゴリ</th>
'''

        html += '''                            </tr>
                        </thead>
                        <tbody>
'''

        # データ行（上位500件）
        sorted_data = sorted(data, key=lambda x: x["volume"], reverse=True)[:500]
        for i, kw in enumerate(sorted_data, 1):
            html += f'''                            <tr>
                                <td class="col-no">{i}</td>
                                <td class="col-kw">{kw["keyword"]}</td>
                                <td class="col-vol">{kw["volume"]:,}</td>
'''
            if key == "できたよ":
                cat = kw.get("category", "")
                icon = kw.get("icon", "")
                html += f'''                                <td><span class="badge badge-cat">{icon} {cat}</span></td>
'''
            html += '''                            </tr>
'''

        html += '''                        </tbody>
                    </table>
                </div>
            </div>
        </div>
'''

    # JavaScript
    html += '''
    </main>
</div>

<script>
function showPage(pageId) {
    // 全ページを非表示
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // 全ナビアイテムを非アクティブ
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // 指定ページを表示
    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');

    // ナビアイテムをアクティブに
    event.target.closest('.nav-item').classList.add('active');
}

function filterTable(input, tableId) {
    const filter = input.value.toLowerCase();
    const table = document.getElementById('table-' + tableId);
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }
        rows[i].style.display = found ? '' : 'none';
    }
}

function sortTable(tableId, colIndex) {
    const table = document.getElementById('table-' + tableId);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const isNumeric = colIndex === 2;
    const direction = table.dataset.sortDir === 'asc' ? -1 : 1;
    table.dataset.sortDir = direction === 1 ? 'asc' : 'desc';

    rows.sort((a, b) => {
        let aVal = a.cells[colIndex].textContent;
        let bVal = b.cells[colIndex].textContent;

        if (isNumeric) {
            aVal = parseInt(aVal.replace(/,/g, '')) || 0;
            bVal = parseInt(bVal.replace(/,/g, '')) || 0;
            return (aVal - bVal) * direction;
        }
        return aVal.localeCompare(bVal, 'ja') * direction;
    });

    rows.forEach(row => tbody.appendChild(row));
}
</script>
</body>
</html>
'''

    return html


def main():
    print("キーワードデータを読み込み中...")

    all_data = {}

    # できたよ！のデータを読み込み
    print("  - できたよ！（自社調査）")
    all_data["できたよ"] = load_dekitayo_keywords()
    print(f"    → {len(all_data['できたよ']):,}件")

    # 競合データを読み込み
    for key, info in COMPANIES.items():
        if info["type"] == "competitor":
            print(f"  - {info['name']}")
            try:
                all_data[key] = load_competitor_keywords(key)
                print(f"    → {len(all_data[key]):,}件")
            except Exception as e:
                print(f"    → エラー: {e}")
                all_data[key] = []

    # HTML生成
    print("\n統合HTMLを生成中...")
    html = generate_html(all_data)

    # 出力
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"\n完了: {OUTPUT_FILE}")
    print(f"総キーワード数: {sum(len(v) for v in all_data.values()):,}件")


if __name__ == "__main__":
    main()
