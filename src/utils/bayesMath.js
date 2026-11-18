/**
 * Menghitung Probabilitas Bersyarat P(A|B) = P(A ∩ B) / P(B)
 */
export function calculateConditionalProbability(pIntersection, pB) {
  if (
    Number.isNaN(pIntersection) ||
    Number.isNaN(pB) ||
    pIntersection < 0 ||
    pIntersection > 1 ||
    pB <= 0 ||
    pB > 1
  ) {
    return {
      error: 'Pastikan 0 ≤ P(A ∩ B) ≤ 1 dan 0 < P(B) ≤ 1 (P(B) tidak boleh 0).',
    };
  }

  if (pIntersection > pB) {
    return {
      error: 'Nilai irisan P(A ∩ B) tidak boleh lebih besar dari P(B).',
    };
  }

  const pAGivenB = pIntersection / pB;
  const percentage = (pAGivenB * 100).toFixed(2);

  return {
    error: null,
    pAGivenB,
    percentage,
    interpretation: `Jika kejadian B sudah dipastikan terjadi (P(B) = ${pB}), maka peluang kejadian A ikut terjadi adalah sebesar ${pAGivenB.toFixed(
      4
    )} atau ${percentage}%.`,
  };
}

/**
 * Menghitung Probabilitas Teorema Bayes:
 * P(H|E) = [P(E|H) * P(H)] / P(E)
 * di mana P(E) = [P(E|H) * P(H)] + [P(E|H') * (1 - P(H))]
 */
export function calculateBayesTheorem(
  prior,
  sensitivity,
  falsePositive,
  hypothesisLabel = 'email phishing',
  evidenceLabel = 'ditandai oleh sistem'
) {
  if (
    Number.isNaN(prior) ||
    Number.isNaN(sensitivity) ||
    Number.isNaN(falsePositive) ||
    prior < 0 ||
    prior > 1 ||
    sensitivity < 0 ||
    sensitivity > 1 ||
    falsePositive < 0 ||
    falsePositive > 1
  ) {
    return {
      error:
        'Seluruh nilai probabilitas harus berada dalam rentang 0 sampai 1 (atau 0% sampai 100%).',
    };
  }

  const priorComplement = 1 - prior; // P(H')
  const truePositiveJoint = sensitivity * prior; // P(E ∩ H)
  const falsePositiveJoint = falsePositive * priorComplement; // P(E ∩ H')

  // 1. Probabilitas total bukti terjadi: P(E)
  const totalEvidenceProb = truePositiveJoint + falsePositiveJoint;

  if (totalEvidenceProb === 0) {
    return {
      error:
        'Probabilitas total bukti P(E) bernilai 0 sehingga pembagian tidak terdefinisi.',
    };
  }

  // 2. Probabilitas Posterior Bayes: P(H|E)
  const posterior = truePositiveJoint / totalEvidenceProb;

  const evidencePct = (totalEvidenceProb * 100).toFixed(2);
  const posteriorPct = (posterior * 100).toFixed(2);

  let confidenceNote = 'cukup tinggi';
  if (posterior < 0.5) {
    confidenceNote =
      'masih di bawah 50% (peluang false alarm cukup besar karena prevalensi awal rendah)';
  } else if (posterior >= 0.85) {
    confidenceNote = 'sangat tinggi dan dapat diandalkan';
  }

  const interpretation = `Dari seluruh kasus yang ada, probabilitas suatu kejadian ${evidenceLabel} adalah ${totalEvidenceProb.toFixed(
    4
  )} (${evidencePct}%). Apabila sistem sudah memberikan tanda (${evidenceLabel}), maka probabilitas bahwa kejadian tersebut benar-benar merupakan ${hypothesisLabel} adalah ${posterior.toFixed(
    4
  )} atau ${posteriorPct}% — tingkat kepastian ini tergolong ${confidenceNote}.`;

  return {
    error: null,
    prior,
    priorComplement,
    sensitivity,
    falsePositive,
    truePositiveJoint,
    falsePositiveJoint,
    totalEvidenceProb,
    posterior,
    evidencePct,
    posteriorPct,
    interpretation,
  };
}