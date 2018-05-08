
class Core {

init(gridNum){
    this.m_visited=[];
    this.m_cnt=0;
    this.m_lines=gridNum;
    this.m_state=new Map();
    // key:code , Item:sprite with m_idx and m_code
    this.m_last = [];//最后被提的棋子数组

}
getCurrentSide(){
 return this.m_cnt % 2 == 0 ? '0' : '1';
}
getIndex() {
    return this.m_cnt;
}
    getCode(r, c) {
        return r * 100 + c;
    }
    getNeighborArray(code) {
        let rt = []
        let row = Math.floor(code / 100);
        let col = code % 100;
        // console.log(code,row,col);
        let left = col - 1;
        let right = col + 1;
        let top = row - 1;
        let bottom = row + 1;
        if (left >= 0) {
            rt.push(this.getCode(row, left));
            // console.log('left:',row, left);
        }

        if (right < this.m_lines) {
            rt.push(this.getCode(row, right));
            //console.log('right:',row, right);
        }
        if (top >= 0) {
            rt.push(this.getCode(top, col));
            // console.log('top:',top, col);
        }

        if (bottom < this.m_lines) {
            rt.push(this.getCode(bottom, col));
            // console.log('bottom:',bottom, col);
        }
        //console.log(rt);
        return rt;
    }
    findDead(start) {
        let result = [];
        let open = [];
        let close = [];
        let side = this.m_state.get(start).m_idx % 2;
        let nbs = this.getNeighborArray(start);
        for (let n of nbs) {
            if (!this.m_state.has(n)) {
                continue;
            }
            let sp = this.m_state.get(n);
            if (side !== sp.m_idx % 2) {
                //  console.log('check:', n);
                open.push(n);
            }
        }
        while (open.length > 0) {
            let cur = open.shift();
            close.push(cur);
            //console.log('pop:', cur);
            if (this.findFree(cur).length == 0) {
                //console.log('dead:', cur);
                result.push(cur)
            }
            let nbs = this.getNeighborArray(cur);
            for (let n of nbs) {
                if (close.includes(n)) {
                    // console.log('again:',n);
                    continue;
                }
                let sp = this.m_state.get(n);
                if (sp && side !== sp.m_idx % 2) {
                    // console.log('push:', n);
                    open.push(n);
                }
            }
        }
        return result;
    }
    findFree(start) {
        let open = [start];
        let close = [];
        let result = [];

        let side = this.m_state.get(start).m_idx % 2;
        while (open.length > 0) {
            let cur = open.shift();
            close.push(cur);
            let nbs = this.getNeighborArray(cur);
            for (let n of nbs) {
                if (!this.m_state.has(n)) {
                    //console.log('free:',n);
                    result.push(n);
                } else {
                    if (close.includes(n)) {
                        // console.log('again:',n);
                        continue;
                    }

                    let sp = this.m_state.get(n);
                    if (side === sp.m_idx % 2) {
                        //console.log('to queue:',n);
                        open.push(n);
                    }
                }
            }
        }
        return result;

    }
    clean(data) {
        for (let d of data) {
            let sp = this.m_state.get(d);
            this.m_last.push(sp);
            this.m_state.delete(d);
        }
    }
    tryPlaceChessman(r, c,sp) {
        this.m_last=[];
        let code = this.getCode(r, c);
        sp.m_idx= this.m_cnt;
        sp.m_code = code;
        this.m_state.set(code, sp); //临时加入进行后续判断
        let dead=this.findDead(code);
        if ( dead.length==0&& this.findFree(code).length == 0) {//没有吃对方并且自己没有气
            this.m_state.delete(code);
            sp.kill();
           // console.log('invalid:',code);
            return false;
        }
        this.clean(dead);
        this.m_visited.push(code);
        this.m_cnt++;
        return true;
    }
    
   isPlaced(code){
       return this.m_state.has(code);
   }
   getPlacedChessman(code){
       return this.m_state.get(code);
   }
    

}    

export default  new Core();