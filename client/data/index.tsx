import React from 'react';

export const navItems = [
    {name: "Acceuil", link: "./"},
    {name: "Bons Plans", link: "./"},
    {name: "Catalogue", link: "./catalogue/"},
    {name: "Temoignages", link: "./#testi"},
    {name: "Infos", link: "./infos"},

]

export const cataloguecards = [
    {
      index: 1,
      description: "2021",
      title: "Mercedes CLA 200 AMG",
      src: "/assets/mercedescla.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://en.wikipedia.org/wiki/Puffin",
      brand:"Mercedes",
      model:"CLA 200 AMG",
      price:"25 000€",
      kilometers:"75 000km",
      color:"Noir",
      fuel:"Essence",
      gearbox:"Manuelle",
      engine:"1.4L",
      doors:"5",
      year:"2022",
      content: () => {
        return (
          <p>
            Puffins are any of three species of small alcids (auks) in the bird genus Fratercula. These are pelagic seabirds that feed primarily by diving in the water. They breed in large colonies on coastal cliffs or offshore islands, nesting in crevices among rocks or in burrows in the soil. Two species, the tufted puffin and horned puffin, are found in the North Pacific Ocean, while the Atlantic puffin is found in the North Atlantic Ocean.
          </p>
        );
      },
    },
    {
      index: 2,
      description: "2021 2.0 TDI 150ch",
      title: "Audi A3 Sportback S Line",
      src: "/assets/audia3.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://en.wikipedia.org/wiki/Budgerigar",
      brand:"Audi",
      model:"CLA 200 AMG",
      price:"25 000€",
      kilometers:"75 000km",
      color:"Noir",
      fuel:"Essence",
      gearbox:"Manuelle",
      engine:"1.4L",
      doors:"5",
      year:"2022",
      content: () => {
        return (
          <p>
            The budgerigar, also known as the common parakeet, shell parakeet or budgie, is a small, long-tailed, seed-eating parrot. Naturally, the species is green and yellow with black, scalloped markings on the nape, back, and wings. Budgies are bred in captivity with colouring of blues, whites, yellows, greys, and even with small crests. Juveniles and chicks are monomorphic, while adults are told apart by their cere colouring, and their behaviour.
          </p>
        );
      },
    },
    {
      index: 3,
      description: "2021",
      title: "Volkswagen Polo R Line ",
      src: "/assets/polo.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://en.wikipedia.org/wiki/Common_kestrel",
      brand:"Volkswagen",
      model:"CLA 200 AMG",
      price:"25 000€",
      kilometers:"75 000km",
      color:"Noir",
      fuel:"Essence",
      gearbox:"Manuelle",
      engine:"1.4L",
      doors:"5",
      year:"2022",
      content: () => {
        return (
          <p>
            The common kestrel (Falco tinnunculus), also known as the European kestrel, Eurasian kestrel or Old World kestrel, is a species of predatory bird belonging to the kestrel group of the falcon family Falconidae. In the United Kingdom, where no other kestrel species commonly occurs, it is generally just called kestrel.
          </p>
        );
      },
    },
    {
      index: 4,
      description: "Cabriolet 450CH 2020",
      title: "Porsche 911 992 carrera 4s",
      src: "/assets/porsche911.png",
      ctaText: "Plus d'infos",
      ctaLink: "https://en.wikipedia.org/wiki/Corvus",
      brand:"Porsche",
      model:"CLA 200 AMG",
      price:"25 000€",
      kilometers:"75 000km",
      color:"Noir",
      fuel:"Essence",
      gearbox:"Manuelle",
      engine:"1.4L",
      doors:"5",
      year:"2022",
      content: () => {
        return (
          <p>
            Corvus is a widely distributed genus of passerine birds ranging from medium-sized to large-sized in the family Corvidae. It includes species commonly known as crows, ravens, and rooks. The species commonly encountered in Europe are the carrion crow, hooded crow, common raven, and rook; those discovered later were named crow or raven chiefly on the basis of their size, crows generally being smaller. The genus name is Latin for raven.
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