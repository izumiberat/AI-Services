// What the demo assistant is allowed to know. It answers ONLY from these sections.
// Keep this in step with index.html: when the site changes, update the matching section here.
// Each section is cited by its id, and the visitor sees its title with a link.

const SITE = "https://izutech.fr/";
const BOOKING = "https://calendar.app.google/Y9YtHrf6hDHfdrVC7";

export const SECTIONS = [
  {
    id: "k1",
    title: "IzuTech en bref",
    url: SITE,
    text: `IzuTech, c'est Izumi Bérat, ingénieur basé à Pau. Il aide les PME à confier à l'IA les tâches répétitives : factures à ressaisir, informations à chercher dans les documents, réponses au support. Prix fixe, premier prototype en deux semaines. Et si ça n'en vaut pas la peine pour l'entreprise, il le dit. Pas de grand plan de « transformation » : on part d'une tâche précise qui coûte du temps chaque semaine.`
  },
  {
    id: "k2",
    title: "Exemples par secteur",
    url: SITE + "#secteurs",
    text: `Cabinets comptables : les factures et relevés reçus en PDF sont lus et saisis dans le logiciel comptable ; on valide au lieu de taper.
Courtiers en assurance : un assistant retrouve la bonne clause dans les contrats et conditions générales, avec la référence du document.
Logistique et transport : les bons de livraison sont lus et rapprochés des commandes, sans ressaisie ; les écarts sont signalés.
Éditeurs de logiciels : chaque ticket de support arrive avec un brouillon de réponse dans le ton de l'entreprise ; l'équipe relit et envoie.
Administratif santé : les courriers et demandes entrants sont triés et résumés avant d'arriver sur le bon bureau.`
  },
  {
    id: "k3",
    title: "Offre : traitement automatique de données (à partir de 900 €)",
    url: SITE + "#services",
    text: `Les factures, bons de commande ou formulaires arrivent par email ou en PDF. L'outil lit les informations, les range dans le logiciel ou le tableur de l'entreprise, et signale ce qui mérite une vérification. L'entreprise garde la validation finale. Exemple : les factures fournisseurs saisies directement dans le logiciel comptable. Prix : à partir de 900 €.`
  },
  {
    id: "k4",
    title: "Offre : assistant interne sur vos documents (à partir de 1 200 €)",
    url: SITE + "#services",
    text: `Les procédures, contrats et notes sont éparpillés. L'assistant répond aux questions de l'équipe à partir des documents de l'entreprise, et indique d'où vient chaque réponse. Exemple : un nouvel arrivant trouve seul comment traiter un dossier, sans interrompre ses collègues. Prix : à partir de 1 200 €. L'assistant de cette page de démonstration est une version miniature de cette offre, branchée sur le contenu du site izutech.fr.`
  },
  {
    id: "k5",
    title: "Offre : copilote pour le support client (à partir de 1 800 €)",
    url: SITE + "#services",
    text: `L'outil prépare un brouillon de réponse dans l'outil de support de l'entreprise (Zendesk, Intercom, Freshdesk…), dans le ton de la marque. L'équipe relit, corrige si besoin, et envoie. Exemple : les questions fréquentes sur la facturation ont une réponse prête à relire. Prix : à partir de 1 800 €.`
  },
  {
    id: "k6",
    title: "Prix, devis et ce qui est inclus",
    url: SITE + "#faq",
    text: `Chaque offre a un périmètre clair. Le prix affiché est un point de départ pour un périmètre défini. Après l'audit, l'entreprise reçoit un devis fixe, qui ne change pas en cours de route sans son accord. Inclus dans chaque offre : prototype sur les vraies données de l'entreprise, documentation, formation de l'équipe et 30 jours de suivi. Un abonnement à un outil d'IA est souvent nécessaire, pour un coût mensuel modeste ; il est chiffré dans le devis pour que le coût total soit connu avant de décider.`
  },
  {
    id: "k7",
    title: "Atelier : construire votre propre agent avec Claude (à partir de 450 €)",
    url: SITE + "#atelier",
    text: `Pour ceux qui préfèrent apprendre à le faire eux-mêmes. En une demi-journée, on construit ensemble un agent qui fait une vraie tâche du quotidien : trier des emails, préparer un compte rendu, tenir un tableau de suivi à jour. On repart avec un agent qui fonctionne et une méthode simple pour en créer d'autres. Aucune connaissance technique n'est nécessaire. Durée : une demi-journée, plus 1 h de suivi deux semaines après. Pour qui : dirigeants et équipes, jusqu'à 6 personnes. Où : dans l'entreprise à Pau, ou en visio. Prix : à partir de 450 €.`
  },
  {
    id: "k8",
    title: "Comment on travaille",
    url: SITE + "#process",
    text: `1. Un appel de 30 minutes, gratuit : on raconte ce qui prend du temps, Izumi dit honnêtement si l'IA peut aider.
2. L'audit : on regarde ensemble une tâche précise (combien de temps elle prend, ce qui peut être automatisé, ce qui doit rester humain). Devis fixe à la clé.
3. Le prototype, en 1 à 2 semaines : il tourne sur les vraies données ; on l'essaie et on décide de continuer ou non.
4. La mise en place, en 4 à 8 semaines : branchement aux outils, documentation et formation de l'équipe.
5. 30 jours de suivi : ajustements. Ensuite, une maintenance est possible si l'entreprise le souhaite.`
  },
  {
    id: "k9",
    title: "Les doutes fréquents",
    url: SITE + "#questions-doutes",
    text: `« On a essayé ChatGPT, c'est resté un gadget. » C'est normal sans accès aux documents et aux outils de l'entreprise. IzuTech branche l'IA sur le travail réel, pour une tâche précise.
« Je ne suis pas technique. » Pas besoin. Le client connaît son métier ; Izumi s'occupe de la technique et explique tout en mots simples.
« Nos données sont sensibles. » On choisit ensemble où elles sont traitées. Le RGPD est pris en compte dès le départ, et le client sait toujours où vont ses données.
« Et si l'IA se trompe ? » Ça arrive. C'est pour ça qu'une personne valide toujours avant que quelque chose parte chez un client ou dans la comptabilité.`
  },
  {
    id: "k10",
    title: "Outils, suivi et zone d'intervention",
    url: SITE + "#faq",
    text: `Outils : IzuTech travaille avec ceux que l'entreprise a déjà : logiciel comptable, CRM, Google Workspace ou Microsoft 365, outil de support. Si un outil se connecte mal, Izumi le dit dès l'audit. Le site ne liste pas de logiciel comptable ou de CRM précis : pour un outil donné, il faut en parler lors de l'appel.
Après la livraison : 30 jours de suivi inclus, documentation, équipe formée ; ensuite une maintenance est possible.
Zone : basé à Pau, déplacements volontiers en Nouvelle-Aquitaine ; pour le reste de la France, travail à distance.`
  },
  {
    id: "k11",
    title: "Qui est derrière IzuTech",
    url: SITE + "#apropos",
    text: `Izumi Bérat, ingénieur de formation. Il a commencé à l'Agence spatiale européenne, sur la mission BepiColombo vers Mercure, avec des équipes européennes et japonaises. Puis plusieurs années à New York dans l'informatique et le produit : migration d'infrastructures bancaires, puis directeur des projets web à l'Université Columbia, où il a piloté le passage d'une plateforme de collecte de fonds vers AWS et Salesforce. Plus récemment, il a dirigé une petite équipe de support technique pour des clients en Europe, aux États-Unis et au Japon. Il a aussi pris plusieurs années pour voyager en famille en Asie et en Europe. Il vit à Pau avec sa femme et leurs trois garçons, et travaille en français, en anglais et en japonais. Ce qui le motive : enlever les frictions, pour que les équipes passent leur temps sur ce qui compte.`
  },
  {
    id: "k12",
    title: "Prendre contact",
    url: SITE + "#contact",
    text: `Appel de 30 minutes gratuit et sans engagement, en visio ou à Pau, à réserver ici : ${BOOKING}
Email : contact@izutech.fr
Formulaire sur le site : on décrit en quelques lignes la tâche qui fait perdre des heures, et Izumi répond par écrit sous deux jours ouvrés avec une piste concrète. Gratuit et sans engagement.`
  },
  {
    id: "k13",
    title: "À propos de cette démonstration",
    url: SITE + "demo.html",
    text: `Cet assistant est une IA, pas une personne. C'est une démonstration de l'offre « assistant interne sur vos documents » : il répond uniquement à partir du contenu du site izutech.fr et indique ses sources. Chez un client, il serait branché sur les documents de l'entreprise. Il fonctionne avec un modèle de Mistral AI, entreprise française. IzuTech n'enregistre pas les conversations. Mistral AI peut conserver les échanges jusqu'à 30 jours pour lutter contre les abus. Il peut se tromper : pour un vrai projet, le mieux est d'en parler lors d'un appel. La page propose aussi une démonstration de lecture de facture et un calcul du temps gagné.`
  },
  {
    id: "k14",
    title: "Les autres activités d'IzuTech",
    url: SITE,
    text: `IzuTech propose aussi : une aide numérique à domicile pour les seniors à Pau (https://seniors.izutech.fr/), la création de sites web pour PME et associations (https://web.izutech.fr/), et des tableaux de bord pour événements (https://events.izutech.fr/).`
  }
];

export const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));
export const BOOKING_URL = BOOKING;
