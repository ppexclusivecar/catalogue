import React from 'react';

export const navItems = [
    {name: "Acceuil", link: "./"},
    {name: "Catalogue", link: "./catalogue/"},
    {name: "Dernières Ventes", link: "./"},
    {name: "Infos", link: "./infos"},

]

export const cataloguecards = [
    {
      index: 1,
      description: "2021",
      title: "Peugeot Partner FOURGON STANDARD 1000 KG BLUEHDI 100 S&S BVM5 GARANTIE",
      src: "/assets/peugeotpartner.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://www.leboncoin.fr/ad/utilitaires/2856473110",
      brand: "Peugeot",
      model: "Partner",
      price: "14 900€",
      kilometers: "80 000km",
      color: "Blanc",
      fuel: "Diesel",
      gearbox: "Manuelle",
      engine: "1.5L",
      doors: "3",
      year: "2021",
      content: () => {
        return (
          <p>
            Le Peugeot Partner est un fourgon léger produit par la marque Peugeot. Il est équipé d'un moteur Diesel 1.5L avec une puissance de 100 chevaux DIN. Ce modèle, immatriculé pour la première fois en mars 2021, présente un kilométrage de 80 000 km et est doté d'une boîte de vitesse manuelle. Il peut accueillir trois personnes et dispose d'une capacité de chargement importante. Ses pièces détachées sont disponibles pendant une durée de 10 ans.
          </p>
        );
      },
    },
    {
      index: 2,
      description: "2019",
      title: "Volkswagen Golf 7 GTI 2.0 TSI 245 ch DSG7 PERFORMANCE GARANTIE 12 MOIS",
      src: "/assets/golf7gti.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://www.leboncoin.fr/ad/voitures/2852284999",
      brand: "Volkswagen",
      model: "Golf 7 GTI",
      price: "29 000€",
      kilometers: "85 000km",
      color: "Noir",
      fuel: "Essence",
      gearbox: "Automatique",
      engine: "2.0L TSI",
      doors: "5",
      year: "2019",
      content: () => {
        return (
          <p>
            La Volkswagen Golf 7 GTI est une berline sportive équipée d'un moteur essence 2.0L TSI, développant 245 chevaux DIN. Ce modèle a été immatriculé pour la première fois en août 2019 et affiche un kilométrage de 85 000 km. Dotée d'une boîte de vitesse automatique DSG7, elle dispose d'une sellerie en alcantara avec cuir partiel. Le véhicule est non endommagé, non fumeur, et un carnet d'entretien est disponible. Cette Golf 7 GTI est couverte par une garantie de 12 mois et bénéficie d'un classement Crit'Air 1, idéal pour circuler dans les zones à faibles émissions.
          </p>
        );
      },
    },
    {
      index: 3,
      description: "2015",
      title: "Land Rover Range Rover Vogue 3.0 TDV6 LIMITED Garantie 12 Mois",
      src: "/assets/rangerover.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://www.leboncoin.fr/ad/voitures/2843624103",
      brand: "Land Rover",
      model: "Range Rover Sport",
      price: "38 000€",
      kilometers: "165 000km",
      color: "Noir",
      fuel: "Diesel",
      gearbox: "Automatique",
      engine: "3.0L TDV6",
      doors: "5",
      year: "2015",
      content: () => {
        return (
          <p>
            Le Land Rover Range Rover Vogue est un 4x4 de luxe équipé d'un moteur Diesel 3.0L TDV6, avec une puissance de 258 chevaux DIN. Ce modèle a été immatriculé pour la première fois en février 2015 et présente un kilométrage de 165 000 km. Doté d'une boîte de vitesse automatique et d'une sellerie tout cuir, il s'agit d'un véhicule non fumeur, avec un carnet d'entretien disponible. Ce Range Rover, parfaitement entretenu, est couvert par une garantie de 12 mois. Les pièces détachées sont disponibles pendant une durée de 10 ans.
          </p>
        );
      },
    },
    {
      index: 5,
      description: "2022",
      title: "AUDI Q8 60 TFSI e 462 Tiptronic 8 Quattro Compétition GARANTIE Constructeur",
      src: "/assets/audiq8.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://www.leboncoin.fr/ad/voitures/2860525119",
      brand: "Audi",
      model: "Q8",
      price: "85 000€",
      kilometers: "94 000km",
      color: "Noir",
      fuel: "Hybride",
      gearbox: "Automatique",
      engine: "60 TFSI e",
      doors: "5",
      year: "2022",
      content: () => {
        return (
          <p>
            L'AUDI Q8 60 TFSI e est un SUV hybride de luxe, doté d'un moteur de 462 chevaux DIN et d'une boîte de vitesse automatique Tiptronic 8. Ce modèle a été immatriculé en août 2022 et affiche un kilométrage de 94 000 km. Avec une sellerie en cuir partiel et alcantara, il est en parfait état, non endommagé, et le carnet d'entretien est disponible. Classé Crit'Air 1, ce véhicule est couvert par une garantie constructeur et les pièces détachées seront disponibles pendant 10 ans. Ce Q8 allie performance et élégance, idéal pour les conducteurs exigeants.
          </p>
        );
      },
    }
    

  ]

  export const testimonials = [
    {
      quote: "J'ai vendu ma voiture en moins d'une semaine ! L'équipe a été super réactive et m'a accompagné tout au long du processus. Un service rapide, transparent et sans stress. Je recommande vivement !",
      name: "Lucas Moreau",
      title: "Client satisfait",
    },
    {
      quote: "Grâce à cette entreprise, j'ai trouvé la voiture d'occasion parfaite à un prix imbattable. Leur équipe est professionnelle, honnête et m'a aidé à chaque étape de l'achat. Une expérience fluide !",
      name: "Chloé Dubois",
      title: "Nouvelle propriétaire",
    },
    {
      quote: "Vendre ma voiture n'a jamais été aussi simple ! L'équipe s'est occupée de tout, de l'évaluation à la paperasse. J'ai obtenu un très bon prix sans effort. Je reviendrai pour ma prochaine vente !",
      name: "Jean-Pierre Lefevre",
      title: "Vendeur satisfait",
    },
    {
      quote: "Ils m'ont proposé une estimation juste et honnête pour ma voiture, avec un processus de vente rapide. J'ai apprécié leur transparence et leur efficacité. Un service de qualité que je recommande.",
      name: "Sophie Martin",
      title: "Client heureuse",
    },
    {
      quote: "Je cherchais une voiture d'occasion fiable, et cette entreprise a surpassé mes attentes. Large choix, bons prix et service client au top. J'ai trouvé exactement ce que je voulais, sans complications.",
      name: "Maxime Richard",
      title: "Acheteur satisfait",
    }
  ];

  export const socialMedia = [
    {
      id: 1,
      img: "/insta.svg",
    },
  ];