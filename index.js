$(document).ready(function () {

    //----------Définitions des variables----------\\

    let text = "<svg width='600' height='600' class='posi'>\n";
    let text1 = "";
    let carre = "";
    let compt_ligne = 1;
    let compt_colonne = 1;
    let compt_car = 1;
    let nbrMurBlanc = 10;
    let nbrMurNoir = 10;
    let pionx_noir = 275;
    let piony_noir = 75;
    let pionx_blanc = 275;
    let piony_blanc = 475;
    let mouv = false;
    let mursY = [];
    let mursX = [];
    let posCase = [];
    let tour = "blanc";
    let last_move = [];


    //----------Création du plateau----------\\

    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            if (compt_car == 37) {
                carre = carre + `<rect id = 'car' class = 'case rect${compt_car} has_noir' x='${50 * i}' y='${50 * j}' width='${50}' height= '${50}'/>\n`;
            } else if (compt_car == 45) {
                carre = carre + `<rect id = 'car' class = 'case rect${compt_car} has_blanc' x='${50 * i}' y='${50 * j}' width='${50}' height= '${50}'/>\n`;
            } else {
                carre = carre + `<rect id = 'car' class = 'case rect${compt_car}' x='${50 * i}' y='${50 * j}' width='${50}' height= '${50}'/>\n`;
            }
            compt_car++;
        }
    }
    for (let i = 1; i <= 10; i++) {
        text1 = text1 + `<line id='mur_noir' data-mur_noir-number='${i}' class = 'mur_noir'  x1='${50*i}' y1='${0}' x2='${50*i}' y2='${50}'  stroke-width='8' />\n`;
    }
    for (let i = 1; i <= 10; i++) {
        text1 = text1 + `<line id='mur_blanc' data-mur_blanc-number='${i}' class = 'mur_blanc'  x1='${50*i}' y1='${500}' x2='${50*i}' y2='${550}'  stroke-width='8' />\n`;
    }
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 10; j++) {
            text1 = text1 + `<line id='ligne' data-line-number='${compt_ligne}' class = 'emptyWall line'  x1='${50 * i}' y1='${50 * j}' x2='${((50 * i) + 50)}' y2='${50 * j}'  stroke-width='8' />\n`;
            compt_ligne++;
        }
    }
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 9; j++) {
            text1 = text1 + `<line id='colonne' data-column-number='${compt_colonne}' class = 'emptyWall column' x1='${50 * i}' y1='${50 * j}' x2='${50 * i}' y2='${500}'  stroke-width='8' />\n`;
            compt_colonne++;
        }
    }

    text = text + carre + text1 + "</svg>";

    //----------Création des pions----------\\
    let rond = "<svg width='600' height='600' class='posi'>\n";
    let rond1 = "";
    rond1 = rond1 + `<circle cx='${pionx_noir}' cy='${piony_noir}' r='20' id='pion_noir'/>`;
    rond = rond + rond1 + "</svg>";
    $(".plateau").append(rond);

    rond = "<svg width='600' height='600' class='posi'>\n";
    rond1 = "";
    rond1 = rond1 + `<circle cx='${pionx_blanc}' cy='${piony_blanc}' r='20' id='pion_blanc'/>`;
    rond = rond + rond1 + "</svg>";
    $(".plateau").append(rond);


    //appel des fonctions pour créer le plateau et placer les murs au click
    $(".plateau").append(text);

    $("line").click(PlaceMur);
    
    // empèche le joueur noir d'intéragir en dehors de son tour
    $(".has_noir").css("pointer-events", "none");
    
    //


    //----------Fonctions----------\\   
    $(".has_blanc").hover(function(){
        if (tour == "noir") {
            
        }
    })
    
    $(".has_noir").hover(function(){
        if (tour == "blanc") {
        }
    })
    
    function PlaceMur() {  //Fonction pour placer un mur sur la ligne et celle d'après      
        if ($(this).hasClass("wall")) {  
        } else {
            if ($(this).hasClass("emptyWall")) {
                if ($(this).hasClass("line")) {  //Partie Ligne
                    let number = parseInt($(this).attr("data-line-number")) + 10;
                    if ($(`.line[data-line-number = "${number}"]`).hasClass("wall")) {
                    } else {
                        if (number <= 91) { //Empêche de prendre la ligne d'une autre ligne
                                if (tour == "blanc") {
                                    if (nbrMurBlanc > 0) {
                                        AddLine(number, this);
                                        nbrMurBlanc --;
                                        $(`#mur_blanc[data-mur_blanc-number="${nbrMurBlanc+1}"]`).addClass("hidden");
                                        $(".has_blanc").css("pointer-events", "none");
                                        $(".has_noir").css("pointer-events", "all");
                                        tour = "noir";
                                        mouv = false;
                                        $(".can").css("fill", "white");
                                        $(".can").css("opacity", "0");
                                    }
                                } else if (tour == "noir") {
                                    if (nbrMurNoir > 0) {
                                        AddLine(number, this);
                                        nbrMurNoir --;
                                        $(`#mur_noir[data-mur_noir-number="${nbrMurNoir+1}"]`).addClass("hidden");
                                        $(".has_noir").css("pointer-events", "none");
                                        $(".has_blanc").css("pointer-events", "all");
                                        tour = "blanc";
                                        mouv = false;
                                        $(".can").css("fill", "white");
                                        $(".can").css("opacity", "0");
                                    }
                                }
                            }
                        }
                    } else {
                        if ($(this).next().hasClass("wall")) {
                        } else {  //Partie Colonne
                            let number = parseInt($(this).attr("data-column-number"));
                            if (number % 9 != 0){  //Empêche de prendre la colonne d'une autre colonne
                            if (tour == "blanc") {
                                if (nbrMurBlanc > 0) {
                                    AddColumn(this);
                                    nbrMurBlanc --;
                                    $(`#mur_blanc[data-mur_blanc-number="${nbrMurBlanc+1}"]`).addClass("hidden");
                                    $(".has_blanc").css("pointer-events", "none");
                                    $(".has_noir").css("pointer-events", "all");
                                    tour = "noir";
                                    mouv = false;
                                    $(".can").css("fill", "white");
                                    $(".can").css("opacity", "0");
                                }
                            } else if (tour == "noir") {
                                if (nbrMurNoir > 0) {
                                    AddColumn(this);
                                    nbrMurNoir --;
                                    $(`#mur_noir[data-mur_noir-number="${nbrMurNoir+1}"]`).addClass("hidden");
                                    $(".has_noir").css("pointer-events", "none");
                                    $(".has_blanc").css("pointer-events", "all");
                                    tour = "blanc";
                                    mouv = false;
                                    $(".can").css("fill", "white");
                                    $(".can").css("opacity", "0");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function AddLine(number, cela) { //Ajoute les murs
        mursX.push([$(cela).attr('x1'), $(cela).attr('y1')]); //Place la position de la ligne dans un tableau
        mursX.push([parseInt($(cela).attr('x1')) + 50, $(cela).attr('y1')]);
        $(cela).removeClass("emptyWall");
        $(cela).addClass("wall");
        $(`.line[data-line-number = "${number}"]`).removeClass("emptyWall");
        $(`.line[data-line-number = "${number}"]`).addClass("wall");
    }

    function AddColumn(cela) { // Ajoute les murs
        mursY.push([$(cela).attr('x1'), $(cela).attr('y1')]);  //Place la position de la colonne dans un tableau
        mursY.push([$(cela).next().attr('x1'), $(cela).next().attr('y1')]);
        $(cela).removeClass("emptyWall");
        $(cela).next().removeClass("emptyWall");
        $(cela).addClass("wall");
        $(cela).next().addClass("wall");
    }

    $(".emptyWall").hover(function () {  //fonction surlignement de la ligne si pas de mur\\
        if ($(this).hasClass("line")) {  //Partie pour les lignes
            let number = parseInt($(this).attr("data-line-number"))+10;
            if (number <= 90) {
                if ($(this).hasClass("wall")) {
                } else if ($(`.line[data-line-number = "${number}"]`).hasClass("wall")) {
                    } else {
                        $(this).addClass("hov");
                        $(`.line[data-line-number = "${number}"]`).addClass("hov");
                    }
                }
            } else {  //Partie pour les colonnes
                let number = parseInt($(this).attr("data-column-number"));
                if ($(this).hasClass("wall")) {
                } else if ($(this).next().hasClass("wall")) {
                } else {
                    if (number % 9 != 0){ 
                    $(this).addClass("hov");
                    $(this).next().addClass("hov");
                    }
                }
            }
    }, function () {  //Fonction pour retirer le hover quand la souris n'est plus sur l'élément
        $(this).removeClass("hov");
        if ($(this).hasClass("line")) {
            let number = parseInt($(this).attr("data-line-number")) + 10;
            $(`.line[data-line-number = "${number}"]`).removeClass("hov");
        } else {
            let number = parseInt($(this).attr("data-column-number")) + 1;
            $(`.column[data-column-number = "${number}"]`).removeClass("hov");
        }
    })

    function testX(mursY, posCase, number, direction) { //vérifie la présence de murs sur l'axe horizontal
        let i = 0;
        let mur = false;
        while (i < mursY.length) {
            if (mursY[i][0] == posCase[0] && mursY[i][1] == posCase[1]) {
            mur = true;
            }
            i++;
        }
        if (mur == false) {
            //permet de sauter au dessus d'un pion (pas finie, les murs ne sont pas testés derrière)
            if ($(".rect" + number).hasClass("has_noir") && direction == "droite" ) {
                number += 9;
            } 
            if ($(".rect" + number).hasClass("has_noir") && direction == "gauche") {
                number -= 9;
            }
            if ($(".rect" + number).hasClass("has_blanc") && direction == "droite" ) {
                number += 9;
            } 
            if ($(".rect" + number).hasClass("has_blanc") && direction == "gauche") {
                number -= 9;
            }
            
            $(".rect" + number).css("fill", "lightgreen");
            $(".rect" + number).css("opacity", "1");
            $(".rect" + number).addClass("can");
            
        }
    }

    function testY(mursX, posCase, number, direction) { //vérifie la présence de murs sur l'axe vertical
         let i = 0;
         let mur = false;
         while (i < mursX.length) {
             if (mursX[i][0] == posCase[0] && mursX[i][1] == posCase[1]) {
             mur = true;
             }
             i++;
         }
         if (mur == false) {
             //permet de sauter au dessus d'un pion (pas finie, les murs ne sont pas testés derrière)
            if ($(".rect" + number).hasClass("has_noir") && direction == "haut"){
                number--;
            }
            if($(".rect" + number).hasClass("has_noir") && direction == "bas"){
                number++;
            }
            if ($(".rect" + number).hasClass("has_blanc") && direction == "haut"){
                number--;
            }
            if($(".rect" + number).hasClass("has_blanc") && direction == "bas"){
               number++;
            }
            
             $(".rect" + number).css("fill", "lightgreen");
             $(".rect" + number).css("opacity", "1");
             $(".rect" + number).addClass("can");
         }
    }

    $(".case").click(function () {  //Fonction pour les déplacements   
        if ($(this).hasClass("has_noir") || $(this).hasClass("has_blanc")) {   //Autoriser les déplacements
            if (mouv == false){
                let number = $(this).attr('class');
                let number2 = $(this).attr('class');
                /*let last_case = $(this).attr('class');
                last_case = parseInt(last_case.substring(9));*/
                number = parseInt(number.substring(9));
                number2 = parseInt(number2.substring(9));

                number = number + 9; //case de droite
                posCase =[$(".rect" + number).attr('x'), $(".rect" + number).attr('y')];
                testX(mursY, posCase, number, "droite");

                number = number - 18; //case de gauche
                posCase =[parseInt($(".rect" + number).attr('x'))+50, $(".rect" + number).attr('y')];
                testX(mursY, posCase, number, "gauche");
                
                number = number + 8;
                posCase =[$(".rect" + number).attr('x'), parseInt($(".rect" + number).attr('y'))+50];

                if (number % 9 != 0){ //case du haut
                    testY(mursX, posCase, number, "haut");
                }
                number = number + 2; //case du bas
                posCase =[$(".rect" + number).attr('x'), $(".rect" + number).attr('y')];
                if ((number % 9)-1 != 0){
                        testY(mursX, posCase, number, "bas");
                    }
                mouv = true;
            } else {
                $(".can").css("fill", "white"); //case du pion
                $(".can").css("opacity", "0");
                $(".can").removeClass("can");
                mouv = false;
            }
        } else if ($(this).hasClass("can")) {    //Faire les déplacements
            mouv = false;
            $(".can").css("fill", "white");
            $(".can").css("opacity", "0");
            
            
            
            if (tour == "noir") {
                $(".has_noir").removeClass("has_noir");
                $(".can").removeClass("can");
                $(this).addClass("has_noir");
                
            } else if (tour == "blanc") {
                $(".has_blanc").removeClass("has_blanc");
                $(".can").removeClass("can");
                $(this).addClass("has_blanc");
            }

            pionx_noir = parseInt($(".has_noir").attr('x')) + 25;
            piony_noir = parseInt($(".has_noir").attr('y')) + 25;

            pionx_blanc = parseInt($(".has_blanc").attr('x')) + 25;
            piony_blanc = parseInt($(".has_blanc").attr('y')) + 25;

            if (tour == "noir") {
                modX(pionx_noir, "pion_noir");
                modY(piony_noir, "pion_noir");
                $(".has_noir").css("pointer-events", "none");
                $(".has_blanc").css("pointer-events", "all");
                tour = "blanc";
                //last_move = [ pionx_noir, piony_noir , last_case]
            } else if (tour == "blanc") {
                modX(pionx_blanc, "pion_blanc");
                modY(piony_blanc, "pion_blanc");
                $(".has_blanc").css("pointer-events", "none");
                $(".has_noir").css("pointer-events", "all");
                tour = "noir";
                //last_move = [ pionx_blanc, piony_blanc , last_case]
                
            }
             Cgagner();
        }
    })

    function Cgagner() { //Fonction lorsqu'un des 2 joueurs remporte la partie
        if (piony_noir == 475) {
            //$(".image").removeClass("hidden");
            //$("svg").css("pointer-events", "none");
            alert("Noir gagne !!\n Rejouer ?");
            restart();
        } else if (piony_blanc == 75){
            //$(".image").removeClass("hidden");
            //$("svg").css("pointer-events", "none");
            alert("Blanc gagne !!\n Rejouer ?");
            restart();
        }
    }

    function modX(posX, pion) {  //modifier la position x du pion
        document.getElementById(pion).setAttribute('cx', posX);
    }
    function modY(posY, pion) { //modifier la position y du pion
        document.getElementById(pion).setAttribute('cy', posY);
    }

    function restart() { //réinitialise les variables de bases pour recommencer la partie
        tour = "blanc";
        pionx_noir = 275;
        piony_noir = 75;
        pionx_blanc = 275;
        piony_blanc = 475;
        nbrMurNoir = 10;
        nbrMurBlanc = 10;
        $(".mur_noir").removeClass("hidden");
        $(".mur_blanc").removeClass("hidden");
        mursY = [];
        mursX = [];
        modX(pionx_noir, "pion_noir");
        modY(piony_noir, "pion_noir");
        modX(pionx_blanc, "pion_blanc");
        modY(piony_blanc, "pion_blanc");
        $(".has_noir").removeClass("has_noir");
        $(".has_blanc").removeClass("has_blanc");
        $(".rect37").addClass("has_noir");
        $(".rect45").addClass("has_blanc");
        $(".wall").addClass("emptyWall");
        $(".wall").removeClass("wall");
        $(`.line[data-line-number = "${number}"]`).removeClass("emptyWall");
        $(`.line[data-line-number = "${number}"]`).addClass("wall");
    }

    /*$(".button").click(function(){ //focntion retourr dernier mouvement (non fonctionelle)
        if (tour == "blanc"){
            console.log(last_move[0])
            console.log(last_move[1])
            $(".has_noir").removeClass("has_noir");
            $(`.rect${last_move[2]}`).addClass("has_noir");
            modX(last_move[0], "pion_noir");
            modY(last_move[1], "pion_noir");
            tour = "noir";
        } else if (tour == "noir") {
            $(".has_blanc").removeClass("has_blanc");
            console.log(`rect${last_move[2]}`)
            $(`.rect${last_move[2]}`).addClass("has_blanc");
            modX(last_move[0], "pion_blanc");
            modY(last_move[1], "pion_blanc");
            tour = "blanc";
        }
    });*/
})
