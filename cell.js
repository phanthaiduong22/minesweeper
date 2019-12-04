function Cell(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.total = 0;
    this.flag = false;
    if (random(1) < 0.12) {
        this.bomb = true;
    } else {
        this.bomb = false;
    }
    this.reveal = false;
}

Cell.prototype.show = function () {
    if (this.flag) {
        stroke(0);
        fill(50);
        rect(this.x, this.y, this.w, this.w);
    } else if (this.reveal) {
        if (this.bomb) {
            stroke(0);
            fill(255);
            rect(this.x, this.y, this.w, this.w);
            fill(20);
            ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w * 0.5, this.w * 0.5);
        } else {
            if (this.total == 0) {
                stroke(0);
                fill(200);
                rect(this.x, this.y, this.w, this.w);
            } else {
                stroke(0);
                fill(200);
                rect(this.x, this.y, this.w, this.w);
                textAlign(CENTER);
                fill(0);
                text(this.total, this.x + this.w * 0.5, this.y + this.w * 0.5 + 3);
            }

        }
    } else {
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.w);
    }
}
Cell.prototype.countBomb = function (a, b) {
    total = 0;
    if (this.bomb)
        this.total = -1
    else {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                x = a + i;
                y = b + j;
                if (x > -1 && x < rows && y > -1 && y < cols) {
                    if (grid[x][y].bomb == true && !(x === a && y === b))
                        total++;
                }
            }
        }
        this.total = total;

    }

}