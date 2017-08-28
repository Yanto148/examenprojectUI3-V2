
export function checkIfNextActionIn24Hours(apparaat) {
    let datumStrings = apparaat.eerstVolgendeActie.datum.split('/');
    let eerstVolgendeActieDatum = new Date(datumStrings[2], datumStrings[1] - 1, datumStrings[0]);
    let currentDay = new Date();

    let eerstVolgendeActieDatumSec = eerstVolgendeActieDatum.getTime();
    let currentDaySec = currentDay.getTime();

    let daysBetween = (eerstVolgendeActieDatumSec - currentDaySec) / 86400000;

    return daysBetween < 2;
}