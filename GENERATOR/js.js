class Generator {

    constructor() {
        this.rightClick();
        this.rightClick_flag = false;
        this.todo;
        this.hide;
        this.genLeft();
        this.loadF();
        this.genRight();
        this.genCheckbox();
        this.CtrlFlag();
        this.cache = [];
        this.CtrlEvents();
        this.whereIsCache = 0;
        this.handle = [];
        this.checkbox = false;
        this.addingToCacheFlag = false;
        this.flag = false;
        this.selected = [];
        this.selected_area = [];
        this.area = {
            left_saved: 0,
            top_saved: 0,
            select: true,
            mm_flag: false,
            start: "",
            end: "",
            old_tab: [],
            new_tab: []
        }
        this.saveTab = [];

        this.loadTab;
    }
    genLeft() {

        let left = document.createElement("div");
        left.id = "left";

        for (let h = 0; h < 2; h++) {
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 16; j++) {

                    let div = document.createElement("div");
                    div.classList.add("left_div");
                    div.style.backgroundImage = "url(../img/sprites.png";
                    div.style.backgroundSize = "960px 600px";
                    if (h > 0) {
                        div.style.backgroundPosition = (960 / 2 - j * 30) + "px " + (600 - i * 30) + "px";
                        div.id = (960 / 2 - j * 30) + "px " + (600 - i * 30) + "px";
                    } else {
                        div.style.backgroundPosition = (960 - j * 30) + "px " + (600 - i * 30) + "px";
                        div.id = (960 - j * 30) + "px " + (600 - i * 30) + "px";
                    }

                    div.onclick = () => { this.onclick(div) };

                    left.appendChild(div);
                }
            }
        }

        document.body.appendChild(left);
    }
    genRight() {
        let right = document.createElement("div");
        right.id = "right";
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 27; j++) {
                let div = document.createElement("div");
                div.classList.add("right_div");
                div.classList.add("grey");

                div.id = i + "&" + j;
                div.style.top = i * 30 + "px";
                div.style.left = j * 30 + "px";
                div.style.border = "1px dashed grey";

                right.appendChild(div);
            }
        }

        right.onmousedown = (e) => { this.onmousedown(right, e) };



        right.onmouseup = (e) => { this.onmouseup(right, e) };



        document.body.appendChild(right);
    }

    onclick(that) {

        this.NewCacheTab();


        for (let x = 0; x < this.selected.length; x++) {

            let div = document.getElementById(this.selected[x]);

            this.AddToCache(div, that.id);
            div.style.backgroundImage = "url(../img/sprites.png";
            div.style.backgroundSize = "960px 600px";
            div.style.backgroundPosition = that.id;

        }

        if (this.checkbox) {

            let next = this.selected[this.selected.length - 1];


            this.selected.forEach(e => {
                document.getElementById(e).style.border = "1px dashed grey";

                document.getElementById(e).classList.add("grey");
                document.getElementById(e).classList.remove("red");


                this.selected = this.selected.filter(function (value) {
                    return value != e;
                })

            });

            next = next.split("&");

            next[0] = parseInt(next[0]);
            next[1] = parseInt(next[1]);


            if (next[1] != 26) {
                next[1]++;
            } else {
                if (next[0] != 39) {
                    next[0]++;
                    next[1] = 0;
                }
            }

            this.selected.push(next[0] + "&" + next[1]);

            document.getElementById(next[0] + "&" + next[1]).classList.remove("grey");
            document.getElementById(next[0] + "&" + next[1]).classList.add("red");
            document.getElementById(next[0] + "&" + next[1]).style.border = "1px solid red";


        }

    }


    genCheckbox() {
        let div = document.createElement("div");
        div.id = "CB";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox";

        checkbox.onchange = () => {
            if (checkbox.checked) this.checkbox = true;
            else this.checkbox = false;

        }

        let p = document.createElement("p");
        p.innerText = "Automatycznie";

        div.appendChild(p);
        div.appendChild(checkbox);

        document.body.appendChild(div);
    }

    CtrlFlag() {

        document.body.addEventListener("keydown", (e) => {

            this.flag = e.ctrlKey || e.metaKey; 

        })
        document.body.addEventListener("keyup", (e) => {

            this.flag = e.ctrlKey || e.metaKey; 

        })
    }


    onmousedown(that, e) {

        if (e.button == 0) {


            that.onmousemove = (e) => { this.onmousemove(that, e) };

            this.area.new_tab = [];

            this.area.start = e.target;

            this.area.new_tab.push(e.target);

        }

    }

    onmousemove(that, e) {

        let area;

        if (!this.area.mm_flag) {
            this.area.old_tab = [];
            area = document.createElement("div");
            area.id = "hidden";
            area.style.left = (e.pageX - 510) + "px";
            area.style.top = (e.pageY - 50) + "px"; 
            that.appendChild(area);
            this.area.mm_flag = true;
            this.area.left_saved = parseInt(area.style.left);
            this.area.top_saved = parseInt(area.style.top);


            if (this.area.start.classList.contains("grey")) {

                this.area.select = true;
            } else {

                this.area.select = false;
            }

        }

        area = document.getElementById("hidden");

        area.style.width = Math.abs((e.pageX - 510) - this.area.left_saved) + "px";


        if ((e.pageX - 510) - this.area.left_saved < 0) {
            area.style.left = (this.area.left_saved - parseInt(area.style.width)) + "px";
        }
        else {
            area.style.left = this.area.left_saved + "px";
        }

        area.style.height = Math.abs((e.pageY - 50) - this.area.top_saved) + "px";

        if ((e.pageY - 50) - this.area.top_saved < 0) {
            area.style.top = (this.area.top_saved - parseInt(area.style.height)) + "px";
        }
        else {
            area.style.top = this.area.top_saved + "px";
        }

        this.area.end = document.getElementById(parseInt((e.pageY - 50) / 30) + "&" + parseInt((e.pageX - 510) / 30));



        let start_id = this.area.start.id.split("&");
        let end_id = this.area.end.id.split("&");

        start_id[0] = parseInt(start_id[0]);
        start_id[1] = parseInt(start_id[1]);
        end_id[0] = parseInt(end_id[0]);
        end_id[1] = parseInt(end_id[1]);

        this.area.new_tab = [];


        for (let i = 0; i <= Math.abs(end_id[0] - start_id[0]); i++) {
            for (let j = 0; j <= Math.abs(end_id[1] - start_id[1]); j++) {

                let negative_i = false;
                let negative_j = false;

                if (end_id[1] - start_id[1] < 0) { j = (-1) * j; negative_j = true };

                if (end_id[0] - start_id[0] < 0) { i = (-1) * i; negative_i = true };

                if (this.area.select) {

                    document.getElementById((start_id[0] + i) + "&" + (start_id[1] + j)).style.border = "1px solid red";
                }
                else {

                    document.getElementById((start_id[0] + i) + "&" + (start_id[1] + j)).style.border = "1px dashed grey";
                }

                document.getElementById((start_id[0] + i) + "&" + (start_id[1] + j)).classList.add("blue");

                this.area.new_tab.push(document.getElementById((start_id[0] + i) + "&" + (start_id[1] + j)));

                if (negative_i) i = (-1) * i;
                if (negative_j) j = j * (-1);

            }

        }

        for (let i = 0; i < this.area.old_tab.length; i++) {

            let flag = false;

            for (let j = 0; j < this.area.new_tab.length; j++) {
                if (this.area.old_tab[i] == this.area.new_tab[j]) { flag = true; break; }
            }

            if (!flag) {

                if (this.area.old_tab[i].classList.contains("grey")) {
                    this.area.old_tab[i].style.border = "1px dashed grey";
                } else {
                    this.area.old_tab[i].style.border = "1px solid red";
                }
                this.area.old_tab[i].classList.remove("blue");

            }
        }

        this.area.old_tab = document.querySelectorAll(".blue");

    }

    onmouseup(that, e) {
        if (e.button == 0) {

            this.area.mm_flag = false;

            if (this.flag) {

                if (this.area.start.classList.contains("grey")) {

                    for (let i = 0; i < this.area.new_tab.length; i++) {

                        this.area.new_tab[i].classList.remove("blue");

                        this.area.new_tab[i].style.border = "1px solid red";

                        this.area.new_tab[i].classList.remove("grey");

                        this.area.new_tab[i].classList.add("red");

                        if (this.selected.indexOf(this.area.new_tab[i].id) == (-1)) {

                            this.selected.push(this.area.new_tab[i].id);
                        }

                    }
                } else {

                    for (let i = 0; i < this.area.new_tab.length; i++) {

                        this.area.new_tab[i].style.border = "1px dashed grey";

                        this.area.new_tab[i].classList.remove("red");
                        this.area.new_tab[i].classList.add("grey");



                        this.selected = this.selected.filter((value) => {
                            return value != this.area.new_tab[i].id;
                        })


                    }


                }


            } else {

                this.selected.forEach(e => {
                    document.getElementById(e).style.border = "1px dashed grey";

                    document.getElementById(e).classList.add("grey");
                    document.getElementById(e).classList.remove("red");


                    this.selected = this.selected.filter(function (value) {
                        return value != e;
                    })

                });


                if (this.area.start.classList.contains("grey")) {

                    for (let i = 0; i < this.area.new_tab.length; i++) {

                        this.area.new_tab[i].classList.remove("blue");

                        this.area.new_tab[i].style.border = "1px solid red";

                        this.area.new_tab[i].classList.add("red");
                        this.area.new_tab[i].classList.remove("grey");

                        this.selected.push(this.area.new_tab[i].id);


                    }

                } else {

                    for (let i = 0; i < this.area.new_tab.length; i++) {

                        this.area.new_tab[i].classList.remove("blue");

                        this.area.new_tab[i].style.border = "1px dashed grey";

                        this.area.new_tab[i].classList.add("grey");
                        this.area.new_tab[i].classList.remove("red");

                        this.selected.push(this.area.new_tab[i].id);

                    }

                }

            }


            if (document.getElementById("hidden") != null)
                document.getElementById("hidden").remove();
            that.onmousemove = "";

        }

    }

    NewCacheTab() {
        for (let i = this.cache.length - 1; i > (this.whereIsCache); i--) {
            this.cache.pop();
        }

        this.cache.push([]);
        this.whereIsCache++;

    }

    AddToCache(friend, newPosition) {

        this.cache[this.cache.length - 1].push({

            oldBackground: friend.style.backgroundPosition,
            newBackground: newPosition,
            id: friend.id

        })
       
    }

    ISE() {
        if (this.selected.length > 0) return true;
        return false;
    }

    find_first() {

        let ksiezniczki = [];
        let ksiazeta = [];

        for (let i = 0; i < this.selected.length; i++) {
            ksiezniczki.push(parseInt(this.selected[i].split("&")[0]));

            ksiazeta.push(parseInt(this.selected[i].split("&")[1]));
        }

        ksiezniczki = ksiezniczki.sort((a, b) => { return a - b });
        ksiazeta = ksiazeta.sort((a, b) => { return a - b });

        return [ksiezniczki[0], ksiazeta[0]];

    }

    AddToHandle() {

        let delta_x = this.find_first()[0];
        let delta_y = this.find_first()[1];

        this.handle = [];

        for (let i = 0; i < this.selected.length; i++) {

            let id = this.selected[i].split("&");
            id[0] = parseInt(id[0]);
            id[1] = parseInt(id[1]);
            id[0] -= delta_x;
            id[1] -= delta_y;


            this.handle.push({
                id_x: id[0],
                id_y: id[1],
                position: document.getElementById(this.selected[i]).style.backgroundPosition
            })
        }

    }

    CtrlEvents() {

        this.cache.push([]);


        document.body.addEventListener("keydown", (e) => {

            if (this.flag == true) {


                switch (e.key) {

                    case "z":

                        this.undo();

                        break;

                    case "y":

                        this.redo();


                        break;

                    case "c":

                        this.copy();


                        break;

                    case "x":

                        this.cut();


                        break;

                    case "v":

                        this.paste();

                        break;

                    case "s":

                        this.save();

                        break;

                    case "l":

                        this.load();

                        break;


                    default:
                        break;
                }

            } else {

                if (e.key == "Delete") {

                    this.delete();

                }
            }

        })

    }

    rightClick() {

        document.body.addEventListener('contextmenu', (ev) => {
            ev.preventDefault();

            if (!this.rightClick_flag) {
                this.tasks();
                this.rightClick_flag = true;

            } else {

                this.todo.remove();
                this.hide.remove();

                this.rightClick_flag = false;

            }


            return false;
        }, false);
    }

    tasks() {
        this.todo = document.createElement("div");
        this.todo.id = "todo";

        let h1;
        let p;

        h1 = document.createElement("h1");
        h1.innerText = "Copy";
        p = document.createElement("p");
        p.innerText = "ctrl + c";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.copy();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;


        })

        h1 = document.createElement("h1");
        h1.innerText = "Paste";
        p = document.createElement("p");
        p.innerText = "ctrl + v";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.paste();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;


        })

        h1 = document.createElement("h1");
        h1.innerText = "Delete";
        p = document.createElement("p");
        p.innerText = "Del";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.delete();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;


        })

        h1 = document.createElement("h1");
        h1.innerText = "Cut";
        p = document.createElement("p");
        p.innerText = "ctrl + x";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.cut();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;


        })

        h1 = document.createElement("h1");
        h1.innerText = "Undo";
        p = document.createElement("p");
        p.innerText = "ctrl + z";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.undo();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;


        })

        h1 = document.createElement("h1");
        h1.innerText = "Redo";
        p = document.createElement("p");
        p.innerText = "ctrl + y";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.redo();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;

        })

        h1 = document.createElement("h1");
        h1.innerText = "Save";
        p = document.createElement("p");
        p.innerText = "ctrl + s";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.save();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;

        })


        h1 = document.createElement("h1");
        h1.innerText = "Load";
        p = document.createElement("p");
        p.innerText = "ctrl + l";
        h1.append(p);
        this.todo.append(h1);
        h1.addEventListener("click", () => {

            this.load();

            this.todo.remove();
            this.hide.remove();
            this.rightClick_flag = false;
            console.log("log");
        })

        this.hide = document.createElement("div");
        this.hide.id = "hide";

        document.body.append(this.todo);

        document.body.append(this.hide);

    }

    delete() {

        this.NewCacheTab();

        for (let i = 0; i < this.selected.length; i++) {
            let friend = document.getElementById(this.selected[i]);
            this.AddToCache(friend, "");
            friend.style.backgroundPosition = "";
            friend.style.backgroundImage = "";
            friend.style.backgroundColor = "black";

        }

    }

    paste() {

        if (this.handle.length > 0) {

            if (this.ISE()) {

                this.NewCacheTab();


                for (let i = 0; i < this.handle.length; i++) {

                    let friend = document.getElementById(this.find_first()[0] + this.handle[i].id_x + "&" + (this.find_first()[1] + this.handle[i].id_y));
                    this.AddToCache(friend, this.handle[i].position);
                    if (this.handle[i].position == "") {

                        friend.style.backgroundPosition = "";
                        friend.style.backgroundImage = "";
                        friend.style.backgroundColor = "black";

                    } else {

                        friend.style.backgroundImage = "url(../img/sprites.png";
                        friend.style.backgroundSize = "960px 600px";
                        friend.style.backgroundPosition = this.handle[i].position;

                    }
                }

            }
        }
    }

    cut() {

        if (this.ISE()) {

            this.NewCacheTab();

            this.AddToHandle();

            for (let i = 0; i < this.selected.length; i++) {

                let friend = document.getElementById(this.selected[i]);
                this.AddToCache(friend, "");
                friend.style.backgroundPosition = "";
                friend.style.backgroundImage = "";
                friend.style.backgroundColor = "black";

            }

        }
    }

    copy() {

        if (this.ISE()) {

            this.AddToHandle();

        }
    }

    redo() {

        if (this.whereIsCache == this.cache.length - 1) {

        } else {

            this.whereIsCache++;

            for (let i = 0; i < this.cache[this.whereIsCache].length; i++) {

                let friend = document.getElementById(this.cache[this.whereIsCache][i].id);

                if (this.cache[this.whereIsCache][i].newBackground == "") {
                    friend.style.backgroundColor = "black";
                    friend.style.backgroundImage = "";
                    friend.style.backgroundPosition = "";

                } else {

                    friend.style.backgroundImage = "url(../img/sprites.png";
                    friend.style.backgroundSize = "960px 600px";
                    friend.style.backgroundPosition = this.cache[this.whereIsCache][i].newBackground;

                }

            }

        }
    }

    undo() {

        if (this.whereIsCache == 0) {

            let friends = document.querySelectorAll(".right_div");
            for (let i = 0; i < friends.length; i++) {
                friends[i].style.backgroundColor = "black";
                friends[i].style.backgroundImage = "";
            }
        } else {

            for (let i = 0; i < this.cache[this.whereIsCache].length; i++) {

                let friend = document.getElementById(this.cache[this.whereIsCache][i].id);

                if (this.cache[this.whereIsCache][i].oldBackground == "") {
                    friend.style.backgroundColor = "black";
                    friend.style.backgroundImage = "";
                    friend.style.backgroundPosition = "";

                } else {

                    friend.style.backgroundImage = "url(../img/sprites.png";
                    friend.style.backgroundSize = "960px 600px";
                    friend.style.backgroundPosition = this.cache[this.whereIsCache][i].oldBackground;

                }

            }

            this.whereIsCache--;
        }

    }

    save() {    

        this.saveTab = [];
        for (let i = 0; i < 40; i++) {

            this.saveTab.push([]);

            for (let j = 0; j < 27; j++) {
                let bool = false;
                let bgp = "";
                let block = document.getElementById(i + "&" + j);
                if (block.style.backgroundPosition) {

                    bgp = block.style.backgroundPosition;
                    bool = !bool;
                }

                this.saveTab[i].push({ exists: bool, position: bgp });
            }
        }


        var blob = new Blob([JSON.stringify(this.saveTab, null, 4)], { type: "text/plain" });

        download(blob, "save.txt");
        function download(blob, name) {
            var url = URL.createObjectURL(blob),
                div = document.createElement("div"),
                anch = document.createElement("a");
            document.body.appendChild(div);
            div.appendChild(anch);
            anch.innerHTML = "&nbsp;";
            div.style.width = "0";
            div.style.height = "0";
            anch.href = url;
            anch.download = name;

            var ev = new MouseEvent("click", {});
            anch.dispatchEvent(ev);
            document.body.removeChild(div);
        }

    }

    loadF(){


        let displayContents = (contents) => {

            this.loadTab = JSON.parse(contents);

            for (let i = 0; i < 40; i++) {
                for (let j = 0; j < 27; j++) {
                    if (this.loadTab[i][j].exists) {
                        let div = document.getElementById(i + "&" + j);
                        div.style.backgroundImage = "url(../img/sprites.png";
                        div.style.backgroundSize = "960px 600px";
                        div.style.backgroundPosition = this.loadTab[i][j].position;
                    }
                    else {
                        let div = document.getElementById(i + "&" + j);
                        div.style.backgroundColor = "black";
                        div.style.backgroundImage = "";
                        div.style.backgroundPosition = "";

                    }

                }
            }



        }

        this.readSingleFile = (e) => {


            var file = e.target.files[0];

            if (!file) {
                return;
            }

            var reader = new FileReader();

            reader.onload = (e) => {

                var contents = e.target.result;
                displayContents(contents);
            };

            reader.readAsText(file);

        }

        let input = document.getElementById("file-input");


       input.addEventListener('change', this.readSingleFile.bind(this), false);

    }

    load() {

        let input = document.getElementById("file-input");

        input.click();

    }

}

document.onkeydown = function (e) {
    e = e || window.event;

    if (!e.ctrlKey) return;

    var code = e.which || e.keyCode;

    switch (code) {
        case 83:
        case 87:
            e.preventDefault();
            e.stopPropagation();
            break;
    }
};

window.onbeforeunload = function (e) {

    e.preventDefault();

    e.returnValue = "";
};

window.addEventListener('DOMContentLoaded', (event) => {
    new Generator();
});
