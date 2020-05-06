module.exports = {
    ArrayLiaison: [
        ["MoyPasJournalier", "CapteurPas"],
        ["MoyFrequenceCardiaqueJournaliere", "CapteurFrequencesCardiaque"],
        ["MoySommeilJournaliere", "CapteurSommeil"],
        ["MoyPointCoeurJournaliere", "CapteurPointCoeur"],
    ],
    moyennes3SemainesCapteurs: {
        MoyPasJournalier: 10000, // nombre de pas cumulé en une journée
        MoyFrequenceCardiaqueJournaliere: 68, // moyenne de bpm en une journée
        MoySommeilJournaliere:28800000, // C'est en milliseconde
        MoyPointCoeurJournaliere: 100, // Les points coeurs sont un indicateur fait par google pour savoir si t'as eu des moments sportif
    },
    donneesJournaliere:{
        heure: [
            1587679197864, 1587682797864,
            1587686397864, 1587689997864,
            1587693597864, 1587697197864,
            1587700797864, 1587704397864,
            1587707997864, 1587711597864,
            1587715197864, 1587718797864,
            1587722397864, 1587725997864,
            1587729597864, 1587733197864,
            1587736797864, 1587740397864,
            1587743997864, 1587747597864,
            1587751197864, 1587754797864,
            1587758397864, 1587761997864
          ],
          CapteurPas: [
            90, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 600, 7131,
            2395, 395, 18, 115, 0, 28,
            56, 25, 256, 0, 0, 0
          ],
          CapteurSommeil: [
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 72, 3600000, 1 ],
            [ 3, 3600000, 1 ],
            [ 3, 3531098, 1 ],
            [ 8, 2561899, 3, 7, 582506, 3 ],
            [ 3, 2799345, 1, 8, 696259, 1, 7, 104396, 1 ],
            [ 3, 3600000, 1 ],
            [ 3, 3600000, 1 ],
            [ 3, 3600000, 1 ],
            [ 3, 3600000, 1 ],
            [ 3, 3549137, 2 ],
            [ 3, 3600000, 1 ],
            [ 3, 3527526, 2, 7, 72474, 1 ],
            [ 3, 3549242, 2 ],
            [ 3, 3600000, 1 ],
            [ 3, 3600000, 1 ],
            [ 3, 3600000, 1 ]
          ],
        CapteurPointCoeur:[
            [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [81, 41],
            [27, 14], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0],
            [0, 0], [0, 0], [0, 0]
          ],
        CapteurFrequencesCardiaque:[
            [], [], [60],
            [60, 63, 62],[60, 63],[60, 63, 62, 63, 62],
            [], [], [],
            [60, 63, 62],[60, 63],[60, 63, 62, 60, 63, 62],
            [90, 80], [], [],
            [], [], [],
            [60, 63, 62],[60, 63],[60, 63, 62, 60, 63, 62],
            [], [], []
          ],
    }
}