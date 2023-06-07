function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            //Sai
            domID(errorId).style.display = "block";
            domID(errorId).innerHTML = mess;
            return false;
        };

        //Dung
        domID(errorId).style.display = "none";
        domID(errorId).innerHTML = "";
        return true;
    };

    this.kiemTraPattern = function (value, letter, errorId, mess) {
        if (value.match(letter)) {
            //true
            domID(errorId).style.display = "none";
            domID(errorId).innerHTML = "";
            return true;
        }

        //false
        domID(errorId).style.display = "block";
        domID(errorId).innerHTML = mess;
        return false;
    };

    this.kiemTraSelect = function (idSelect, errorId, mess) {
        if (domID(idSelect).selectedIndex !== 0) {
            //true
            domID(errorId).style.display = "none";
            domID(errorId).innerHTML = "";
            return true;
        }

        //false
        domID(errorId).style.display = "block";
        domID(errorId).innerHTML = mess;
        return false;
    };
};  