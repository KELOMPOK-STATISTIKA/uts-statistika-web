export function calculateBasicProbability(
  pA,
  pB,
  relationType = 'mutually_exclusive',
  customIntersection = 0
) {
  if (
    Number.isNaN(pA) ||
    Number.isNaN(pB) ||
    pA < 0 ||
    pA > 1 ||
    pB < 0 ||
    pB > 1
  ) {
    return { error: 'Nilai P(A) dan P(B) harus berada di antara 0 dan 1.' };
  }

  const compA = 1 - pA;
  const compB = 1 - pB;

  let intersection = 0;
  let relationLabel = '';
  let formulaNote = '';
  let stepDetails = [];

  if (relationType === 'mutually_exclusive') {
    intersection = 0;
    relationLabel = 'Kejadian Saling Lepas (Mutually Exclusive)';
    formulaNote = 'Karena A dan B saling lepas, P(A ∩ B) = 0 dan P(A ∪ B) = P(A) + P(B).';
    stepDetails = [
      `P(A') = 1 - ${pA} = ${compA.toFixed(4)}`,
      `P(B') = 1 - ${pB} = ${compB.toFixed(4)}`,
      `P(A ∩ B) = 0 (Saling Lepas)`,
      `P(A ∪ B) = P(A) + P(B) = ${pA} + ${pB} = ${(pA + pB).toFixed(4)}`
    ];
  } else if (relationType === 'independent') {
    intersection = pA * pB;
    relationLabel = 'Kejadian Independen (Saling Bebas)';
    formulaNote = 'Karena A dan B independen, P(A ∩ B) = P(A) × P(B).';
    stepDetails = [
      `P(A') = 1 - ${pA} = ${compA.toFixed(4)}`,
      `P(B') = 1 - ${pB} = ${compB.toFixed(4)}`,
      `P(A ∩ B) = P(A) × P(B) = ${pA} × ${pB} = ${intersection.toFixed(4)}`,
      `P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = ${pA} + ${pB} - ${intersection.toFixed(4)} = ${(pA + pB - intersection).toFixed(4)}`
    ];
  } else {
    if (
      Number.isNaN(customIntersection) ||
      customIntersection < 0 ||
      customIntersection > 1
    ) {
      return { error: 'Nilai irisan P(A ∩ B) harus berada di antara 0 dan 1.' };
    }
    const minVal = Math.min(pA, pB);
    if (customIntersection > minVal) {
      return {
        error: `Nilai irisan P(A ∩ B) tidak boleh lebih besar dari P(A) maupun P(B) (maksimal ${minVal}).`,
      };
    }
    intersection = customIntersection;
    relationLabel = 'Kejadian Umum (Tidak Saling Lepas)';
    formulaNote = 'Menggunakan aturan penjumlahan umum: P(A ∪ B) = P(A) + P(B) - P(A ∩ B).';
    stepDetails = [
      `P(A') = 1 - ${pA} = ${compA.toFixed(4)}`,
      `P(B') = 1 - ${pB} = ${compB.toFixed(4)}`,
      `P(A ∩ B) = ${intersection} (Input Kustom)`,
      `P(A ∪ B) = ${pA} + ${pB} - ${intersection} = ${(pA + pB - intersection).toFixed(4)}`
    ];
  }

  const union = pA + pB - intersection;

  if (union > 1 + 1e-9) {
    return {
      error: `Hasil gabungan P(A ∪ B) (${union.toFixed(4)}) melebihi 1. Periksa kembali nilai input atau hubungan kejadian.`,
    };
  }

  return {
    error: null,
    pA,
    pB,
    compA,
    compB,
    intersection,
    union: Math.min(1, union),
    relationLabel,
    formulaNote,
    stepDetails,
  };
}