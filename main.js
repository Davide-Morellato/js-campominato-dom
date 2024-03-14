// RICHIAMO IL BOTTONE PER CREARE POI LA GRIGLIA [document.querySelector()]

const createGridButton = document.querySelector('.btn') ;


// CREO L'EVENTO SUL BOTTONE PER GENERARE LA GRIGLIA [.addEventListener()]

createGridButton.addEventListener('click', function(){

    // CREO UNA VARIABILE PER RICHIAMARMI LA GRIGLIA

    const grid = document.querySelector('.grid') ;


    // INDICO CHE AD OGNI RIGENERAZIONE DI GRIGLIA RIMUOVA LA CLASSE pointer-none
    
    grid.classList.remove('pointer-none')

    // INDICO CHE AD OGNI CLICK SUCCESSIVO AL PRIMO LA GRIGLIA DEVE ESSERE VUOTA

    grid.innerHTML = '';
    

    // CREO UN ARRAY VUOTO IN CUI INSERIRE I NUMERI RANDOM GENERATI DAL PC

    const arrayBombs = [] ;


    // CREO UNA VARIABILE PER INDICARE QUANTI NUMERI VOGLIO CHE VENGANO GENERATI NELL'ARRAY

    const randomNumbers = 16 ;


    // DICHIARO UNA VARIABILE GLOBALE PER INDICARE QUANTI NUMERI RANDOM DEVONO ESSERE GENERATI NEL CICLO while PER I VERI LIVELLI DI DIFFICOLTA'

    let max ;
    

    // RICHIAMO IL SELETTORE DI DIFFICOLTA' [document.getElementById()]

    const selectLevel = document.getElementById('difficult') ;


    // CREO UNA VARIABILE PER PRENDERE IL VALORE DEL SELETTORE (.value)

    let selectLevelValue = selectLevel.value ;


    // CREO UNA VARIABILE cellRow CON SCOPE GLOBALE PER INDICARE QUANTE CELLE VOGLIO SU UNA RIGA

    let cellRow ;


    // SE IL VALORE DEL SELETTORE E' EASY
        // ALLORA GENERA UNA GRIGLIA DI 10*10
        // CONSIDERA DI GENERARE NUMERI max 100
        // AGGIUNGI LA CLASSE grid-easy ALLA GRIGLIA PER LA DISPOSIZIONE DELLE CELLE (.add)
        // RIMUOVI LE CLASSI PRECEDENTI AL CAMBIO DELLA DIFFICOLTA' (.remove)

    // ALTRIMENTI SE IL VALORE DEL SELETTORE E' MEDIUM
        // ALLORA GENERA UNA GRIGLIA DI 9*9
        // CONSIDERA DI GENERARE NUMERI max 81
        // AGGIUNGI LA CLASSE grid-medium ALLA GRIGLIA PER LA DISPOSIZIONE DELLE CELLE (.add)
        // RIMUOVI LE CLASSI PRECEDENTI AL CAMBIO DELLA DIFFICOLTA' (.remove)

    // ALTRIMENTI IL VALORE DEL SELETTORE E' HARD
        // ALLORA GENERA UNA GRIGLIA DI 7*7
        // CONSIDERA DI GENERARE NUMERI max 49
        // AGGIUNGI LA CLASSE grid-hard ALLA GRIGLIA PER LA DISPOSIZIONE DELLE CELLE (.add)
        // RIMUOVI LE CLASSI PRECEDENTI AL CAMBIO DELLA DIFFICOLTA' (.remove)

    if (selectLevelValue === 'easy'){

        cellRow = 10 ;

        max = 100 ;

        grid.classList.add('grid-easy') ;

        grid.classList.remove('grid-medium', 'grid-hard') ;

    } else if(selectLevelValue === 'medium'){

        cellRow = 9 ;

        max = 81 ;

        grid.classList.add('grid-medium') ;

        grid.classList.remove('grid-easy', 'grid-hard') ;

    } else {

        cellRow = 7 ;

        max = 49 ;

        grid.classList.add('grid-hard') ;

        grid.classList.remove('grid-easy', 'grid-medium') ;
    }
    

    // CREO UNA VARIABILE gridCells PER INDICARE QUANTE CELLE TOTALI VOGLIO PER LA GRIGLIA

    const gridCells = cellRow * cellRow ;


    // CREO UN CICLO while PER GENERARE I NUMERI RANDOM DA AGIIUNGERE ALL'ARRAY arrayBombs
    // LA LUNGHEZZA DELL'ARRAY DEVE ESSERE MINORE DEI NUMERI RANDOM DA GENERARE

    while (arrayBombs.length < randomNumbers){

        // GENERO I 16 NUMERI CASUALI

        const randomBombs = parseInt(Math.floor(Math.random() * max) + 1)

        //SE L'ARRAY VUOTO arrayBombs NON INCLUDE (.includes) IL NUMERO RANDOM (randomBombs)
            // ALLORA INSERISCO IL NUMERO RANDOM NELL'ARRAY (.push)

        if(arrayBombs.includes(randomBombs) === false){
            arrayBombs.push(randomBombs)
        }
    }

    // STAMPO I NUMERI GENERATI IN CONSOLE (fuori dal ciclo while così non ne genera in maniera infinita)
    
    console.log(arrayBombs)


    // CREO UN CICLO for PER AGGIUNGERE LE CELLE AL DOM

    for(let i = 0; i < gridCells; i++){

        // CREO UNA VARIABILE PER AGGIUNGERNE UNA ALLE CELLE GENERATE [(da 0 a 99) + 1]

        const cells = i + 1 ;


        // CREO LA SINGOLA CELLA [document.createElement()]
        
        const gridCell = document.createElement('div') ;


        // ASSEGNO LA CLASSE cell ALLA SINGOLA CELLA (.className)

        gridCell.className = 'cell' ;


        // GENERO LE CELLE NELLA GRIGLIA AGGIUNGENDOLE AL DOM (.innerHTML)

        gridCell.innerHTML = cells ;


        // APPENDO LE CELLE CREATE singleCell ALLA GRIGLIA grid (.append)

        grid.append(gridCell) ;



        // RICHIAMO LO score DAL DOM PER VISUALIZZARE IL PUNTEGGIO

        const score = document.querySelector('.score')

        // INDICO CHE IL PUNTEGGIO DEVE PARTIRE DA 0 AD OGNI GENERAZIONE DI GRIGLIA

        score.innerHTML = 0
        

        // RICHIAMO IL result DAL DOM PER VISUALIZZARE SE HA VINTO O PERSO

        const result = document.querySelector('.result')


        // CREO L'EVENTO SULLA CELLA PER GIOCARE (.addEventListener)

        gridCell.addEventListener('click', function(){

            // INDICO CHE AL CLICK SULLA CELLA LO SCORE DEVE INCREMENTARE DI 1

            score.innerHTML++


            // ASSEGNO LA CLASSE bg-sand (.classList) ALLA CELLA AL CLICK (.add)

            gridCell.classList.add('bg-sand')


            // STAMPO IN CONSOLE LE CELLE SU CUI SI CLICCA

            console.log(cells)


            // CREO UN CICLO for

            for(let j = 0; j < arrayBombs.length; j++){

                // CREO UNA VARIABILE PER I SINGOLI ELEMENTI DELL'ARRAY arrayBombs

                const bombCell = arrayBombs[j] ;


                // SE LA CELLA SELEZIONATA E' LA STESSA DELLA CELLA BOMBA (il singolo elemento dell'arrayBombs)
                    // ALLORA RIMUOVI LA CLASSE bg-sand;
                    // AGGIUNGI LA CLASSE bg-red
                    // AGGIUNGI LA CLASSE pointer-none
                    // RIDUCI DI 1 IL PUNTEGGIO (per non visualizzare nel punteggio la cella con la bomba)
                    // SOSTITUISCO LA CLASSE d-none CON LA CLASSE d-block PER VISUALIZZARE L'ESITO

                if(cells === bombCell){

                    gridCell.classList.remove('bg-sand')
                    gridCell.classList.add('bg-red')
                    grid.classList.add('pointer-none')
                    score.innerHTML--

                    result.classList.replace('d-none', 'd-block')

                }
            }

        })

    }

})


