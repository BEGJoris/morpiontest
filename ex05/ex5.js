let gridSize = prompt("Entrez la taille de la grille (par exemple, 3 pour une grille de 3x3):");
    gridSize = parseInt(gridSize) || 3; // Par défaut, une grille de 3x3

    // Création dynamique de la grille
    let table = document.createElement("table");
    document.body.appendChild(table);

    for (let i = 0; i < gridSize; i++) {
        let row = table.insertRow(i);
        for (let j = 0; j < gridSize; j++) {
            let cell = row.insertCell(j);
            cell.addEventListener("click", function () {
                cellClicked(i, j);
            });
        }
    }

    let currentPlayer = "X";
    let gameOver = false;

    function cellClicked(row, col) {
        if (gameOver) return;

        let cell = table.rows[row].cells[col];

        if (cell.innerHTML === "") {
            cell.innerHTML = currentPlayer;
            if (checkWinner(row, col)) {
                alert("Joueur " + currentPlayer + " a gagné !");
                gameOver = true;
            } else if (checkDraw()) {
                alert("Match nul !");
                gameOver = true;
            } else {
                currentPlayer = (currentPlayer === "X") ? "O" : "X";
            }
        } else {
            alert("Case déjà occupée, choisissez une autre case.");
        }
    }

    function checkWinner(row, col) {
        return checkRow(row) || checkColumn(col) || checkDiagonals(row, col);
    }

    function checkRow(row) {
        for (let i = 0; i < gridSize; i++) {
            if (table.rows[row].cells[i].innerHTML !== currentPlayer) {
                return false;
            }
        }
        return true;
    }

    function checkColumn(col) {
        for (let i = 0; i < gridSize; i++) {
            if (table.rows[i].cells[col].innerHTML !== currentPlayer) {
                return false;
            }
        }
        return true;
    }

    function checkDiagonals(row, col) {
        if (row === col || row + col === gridSize - 1) {
            return checkMainDiagonal() || checkAntiDiagonal();
        }
        return false;
    }

    function checkMainDiagonal() {
        for (let i = 0; i < gridSize; i++) {
            if (table.rows[i].cells[i].innerHTML !== currentPlayer) {
                return false;
            }
        }
        return true;
    }

    function checkAntiDiagonal() {
        for (let i = 0; i < gridSize; i++) {
            if (table.rows[i].cells[gridSize - 1 - i].innerHTML !== currentPlayer) {
                return false;
            }
        }
        return true;
    }

    function checkDraw() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (table.rows[i].cells[j].innerHTML === "") {
                    return false;
                }
            }
        }
        return true;
    }