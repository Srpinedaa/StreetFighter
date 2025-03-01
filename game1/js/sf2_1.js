
var canvas, ctx, interval, interval_player;
let segundo_1s = 9;
let segundo_10s = 9;
let contadorFrames = 0;
let spritX_1rcontador = 158;
let spritX_2ocontador = 158;
document.addEventListener('DOMContentLoaded', inicio);



function mostrarContador(imgDecoraciones) {

    contadorFrames++;
    let spriteDecoraciones = new Image();
    spriteDecoraciones.src = imgDecoraciones;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //10 segundos
    if (contadorFrames % 1200 === 0) {
        segundo_10s--;
        if (segundo_10s >= -1) {
            switch (segundo_10s) {
                case 0:
                    spritX_1rcontador = 15;
                    break
                    ;
                case 1:
                    spritX_1rcontador = 31;
                    break;
                case 2:
                    spritX_1rcontador = 47;
                    break;
                case 3:
                    spritX_1rcontador = 63;
                    break;
                case 4:
                    spritX_1rcontador = 79;
                    break;
                case 5:
                    spritX_1rcontador = 94;
                    break;
                case 6:
                    spritX_1rcontador = 111;
                    break;
                case 7:
                    spritX_1rcontador = 127;
                    break;
                case 8:
                    spritX_1rcontador = 142;
                    break;
                case 9:
                    spritX_1rcontador = 158;
                    break;
                default:
                    spritX_1rcontador = 15;
                    break;

            }

        } else {
            return;
        }
    }
    // Un segundo
    if (contadorFrames % 120 === 0) {
        segundo_1s--;
        if (segundo_1s >= 0) {
            switch (segundo_1s) {
                case 0:
                    spritX_2ocontador = 15;
                    break
                    ;
                case 1:
                    spritX_2ocontador = 31;
                    break;
                case 2:
                    spritX_2ocontador = 47;
                    break;
                case 3:
                    spritX_2ocontador = 63;
                    break;
                case 4:
                    spritX_2ocontador = 79;
                    break;
                case 5:
                    spritX_2ocontador = 94;
                    break;
                case 6:
                    spritX_2ocontador = 111;
                    break;
                case 7:
                    spritX_2ocontador = 127;
                    break;
                case 8:
                    spritX_2ocontador = 142;
                    break;
                case 9:
                    console.log("Hola");
                    spritX_2ocontador = 158;
                    break;
                default:
                    break;

            }

        } else {
            if (segundo_10s <= -1) {
                return;
            }
            spritX_2ocontador = 158;
            segundo_1s = 9;
        }
    }


    ctx.drawImage(spriteDecoraciones, spritX_1rcontador, 32,
        14, 15, 178, 34, 14, 15);
    ctx.drawImage(spriteDecoraciones, spritX_2ocontador, 32,
        14, 15, 193, 34, 14, 15);

}


let player1 = function (x, y, width, height, img, imgDecoraciones) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.velocidadX = 4;
    this.gravedad = 4.8;
    this.imgDecoraciones = imgDecoraciones;
    this.frameDelay = 5;
    this.frameContador = 0;



    this.dibuja = function () {
        let sprite = new Image();
        sprite.src = this.img;

        ctx.drawImage(sprite, this.sprite_x, this.sprite_y,
            this.sprite_w, this.sprite_h, this.x, this.y, this.width, this.height);

    }

    this.mover = function (jugador) {
        switch (jugador) {
            case 1:
                this.x += this.velocidadX;
                if (this.x > canvas.width - this.width) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x < 0) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            case 2:
                this.x -= this.velocidadX;
                if (this.x < 0) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x > canvas.width - this.width) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            default:
                break;

        }

    }


    let actualFrame = 0;

    this.animacion = function () {

        if (this.frameContador >= this.frameDelay) {
            actualFrame = (actualFrame + 1) % zangifReady.length;
            let frame = zangifReady[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    this.izquierda = function () {
        this.x -= this.velocidadX;

    }

    this.derecha = function () {
        this.x += this.velocidadX;
    }
    this.saltar = function () {
        if (this.y >= 180) {
            this.y -= this.gravedad * 40;
        }
    }
    this.descender = function () {
        if (this.y < (canvas.height - this.height)) {
            this.y += this.gravedad;
        }
    }

    this.agacharse = function () {
        this.height = this.height / 2;
        this.y = this.y + this.height;
        this.dibuja();
    }

    this.levantarse = function () {
        this.height = this.height * 2;
        this.y = canvas.height - this.height;
        this.dibuja();
    }

    this.dibujarObjetos = function () {
        let spriteDecoraciones = new Image();
        spriteDecoraciones.src = this.imgDecoraciones;
        //Barra
        ctx.drawImage(spriteDecoraciones, 16, 18,
            140, 11, 37, 20, 140, 11);
        //Numero de personaje
        ctx.drawImage(spriteDecoraciones, 31, 100,
            7, 11, 2, 0, 7, 11);
        ctx.drawImage(spriteDecoraciones, 17, 124,
            10, 12, 10, 0, 10, 12);
        //Victoria 1
        ctx.drawImage(spriteDecoraciones, 344, 15,
            16, 17, 2, 16, 16, 17);

        //Victoria 2
        ctx.drawImage(spriteDecoraciones, 344, 15,
            16, 17, 20, 16, 16, 17);

        //Nombre
        ctx.drawImage(spriteDecoraciones, 16, 71,
            63, 10, 40, 35, 63, 10);
    }

}

let zangif = new player1(50, 92, 103, 110, 'img/zangif.png', 'img/decoraciones.png');


let player2 = function (x, y, width, height, img, imgDecoraciones) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.velocidadX = 4;
    this.gravedad = 4.8;
    this.imgDecoraciones = imgDecoraciones;

    this.frameDelay = 5;
    this.frameContador = 0;



    this.dibuja = function () {
        let sprite = new Image();
        sprite.src = this.img;

        ctx.drawImage(sprite, this.sprite_x, this.sprite_y,
            this.sprite_w, this.sprite_h, this.x, this.y, this.width, this.height);

    }

    this.mover = function (jugador) {
        switch (jugador) {
            case 1:
                this.x += this.velocidadX;
                if (this.x > canvas.width - this.width) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x < 0) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            case 2:
                this.x -= this.velocidadX;
                if (this.x < 0) {
                    this.velocidadX -= this.velocidadX;
                } else {
                    if (this.x > canvas.width - this.width) {
                        this.velocidadX -= this.velocidadX;
                    }
                }
                break;
            default:
                break;

        }

    }

    let actualFrame = 0;

    this.animacion = function () {

        if (this.frameContador >= this.frameDelay) {
            actualFrame = (actualFrame + 1) % bisonReady.length;
            let frame = bisonReady[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }
    this.izquierda = function () {
        this.x -= this.velocidadX;

    }

    this.derecha = function () {
        this.x += this.velocidadX;
    }
    this.saltar = function () {
        if (this.y >= 180) {
            this.y -= this.gravedad * 40;
        }
    }
    this.descender = function () {
        if (this.y < (canvas.height - this.height)) {
            this.y += this.gravedad;
        }
    }

    this.agacharse = function () {
        this.height = this.height / 2;
        this.y = this.y + this.height;
        this.dibuja();
    }

    this.levantarse = function () {
        this.height = this.height;
        this.y = canvas.height - this.height;
        this.dibuja();
    }

    this.dibujarObjetos = function () {
        let spriteDecoraciones = new Image();
        spriteDecoraciones.src = this.imgDecoraciones;
        //Barra
        ctx.drawImage(spriteDecoraciones, 193, 18,
            145, 11, 208, 20, 140, 11);
        //Numero de personaje    
        ctx.drawImage(spriteDecoraciones, 41, 100,
            10, 12, 362, 0, 10, 12);
        ctx.drawImage(spriteDecoraciones, 17, 124,
            10, 12, 373, 0, 10, 12);
        //Victoria 1
        ctx.drawImage(spriteDecoraciones, 344, 15,
            16, 17, 349, 16, 16, 17);
        //Victoria 2
        ctx.drawImage(spriteDecoraciones, 344, 15,
            16, 17, 367, 16, 16, 17);
        //nombre
        ctx.drawImage(spriteDecoraciones, 290, 71,
            45, 10, 305, 35, 45, 10);

    }
}

let bison = new player2(230, 100, 108, 96, 'img/bison.png', 'img/decoraciones.png');
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        //Jugador 2
        case "ArrowUp":
            bison.saltar();
            break;
        case "ArrowDown":
            if (!e.repeat) {
                bison.agacharse();
            }
            break;
        case "ArrowLeft":
            bison.izquierda();
            break;
        case "ArrowRight":
            bison.derecha();
            break;
        //Jugador 1
        case "w":
            zangif.saltar();
            break;
        case "s":
            if (!e.repeat) {
                zangif.agacharse();
            }
            break;
        case "a":
            zangif.izquierda();

            break;
        case "d":
            zangif.derecha();
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowDown":
            bison.levantarse();
            break;
        case "s":
            zangif.levantarse();
            break;
    }
});

let stage = function (x, y, width, height, img, imgDecoraciones) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.imgDecoraciones = imgDecoraciones;
    this.frameDelay = 5;
    this.frameContador = 0;
    this.dibuja = function () {
        let sprite = new Image();
        sprite.src = this.img;
        ctx.drawImage(sprite, this.sprite_x, this.sprite_y,
            this.sprite_w, this.sprite_h, this.x, this.y, this.width, this.height);
    }

    let actualFrame = 0;

    this.animacion = function () {

        if (this.frameContador >= this.frameDelay) {
            actualFrame = (actualFrame + 1) % bisonEscena.length;
            let frame = bisonEscena[actualFrame];
            this.sprite_x = frame.x;
            this.sprite_y = frame.y;
            this.sprite_w = frame.width;
            this.sprite_h = frame.height;

            this.frameContador = 0;
        } else {
            this.frameContador++;
        }
        this.dibuja();
        this.dibujarObjetos();
        mostrarContador('img/decoraciones.png');
        // interval_player = requestAnimationFrame(this.animacion.bind(this));
    }

    this.dibujarObjetos = function () {
        let spriteDecoraciones = new Image();
        spriteDecoraciones.src = this.imgDecoraciones;
        //Ko
        ctx.drawImage(spriteDecoraciones, 161, 16,
            32, 14, 176, 18, 32, 14);

    }

}


// let escena_bison = new stage(0, 0, 621, 224, 'img/bison_Background_sprite.png');
let escena_bison = new stage(0, 0, 474, 224, 'img/zangif_sprite_background.png', 'img/decoraciones.png');

function inicio() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    principal();
}

function principal() {
    borrarCanvas();
    mostrarContador('img/decoraciones.png');
    escena_bison.dibuja();
    escena_bison.dibujarObjetos();
    escena_bison.animacion();
    bison.dibuja();
    bison.dibujarObjetos();
    bison.animacion();
    // bison.descender();
    zangif.dibuja();
    zangif.animacion();
    zangif.dibujarObjetos();
    // zangif.descender();
    interval = requestAnimationFrame(principal);
}

function borrarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}