#language:fr

Fonctionnalité: Consulter les droits de diffusion des publications associés aux éditeurs.

 Le chercheur veut rendre public son travail à travers la plateforme. Il aimerait avant cela, accèder à la liste des droits propres à chaque éditeur afin de savoir ce qu'il est autorisé à diffuser.
 Le chercheur possède un article au format PDF. Cependant, par crainte, il ne l'importe pas car il ne connait pas les droits associés à l'éditeur.
 Un utilisateur identifié souhaite vérifier les droits de diffusion relatifs à un tiré-à-part déjà importé car il a un doute.

Scénario: créer ou modifier une notice et rechercher les droits de diffusion propres à un éditeur

 Etant donné que le chercheur possède un article au format PDF
 Et que il aimerait obtenir les droits de diffusion associés à un "éditeur" précis avant de l'importer
 Quand il saisit le nom de l'"éditeur" dans le formulaire de création ou d'édition d'une notice
 Et que il clique sur le bouton "Consulter les droits de l'éditeur" 
 Alors les droits de diffusion liés à cet "éditeur" sont affichés
 Et le chercheur sait exactement quelles versions de son travail il peut rendre publiques

Scénario: vérifier les droits d'éditeur après ajout d'un tiré-à-part

 Etant donné une "notice" existante possédant un "tiré-à-part"
 Quand un utilisateur identifié consulte cette "notice"
 Alors il peut vérifier les droits de diffusion associés à l'éditeur de la publication 
