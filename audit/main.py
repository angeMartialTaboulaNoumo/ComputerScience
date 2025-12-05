from analyzer import analyze_page
from ecoindex import ecoindex_score
from lighthouse import lighthouse_report
from coverage import coverage_analysis

def run(url):
    print("Analyse en cours pour:", url)

    metrics = analyze_page(url)

    metrics["ecoindex"] = ecoindex_score(url)

    try:
        metrics["lighthouse"] = lighthouse_report(url)
    except:
        metrics["lighthouse"] = None

    try:
        metrics["coverage"] = coverage_analysis(url)
    except:
        metrics["coverage"] = None

    print("\n=== Résultat final ===")
    for key, value in metrics.items():
        print(key, ":", value)


if __name__ == "__main__":
    run("http://localhost:3000/")
