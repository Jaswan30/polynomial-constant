const fs=require("fs");

const reqdata=fs.readFileSync("input.json","utf8");
const parsedata=JSON.parse(reqdata);

const reqpoints=parsedata.keys.k;
let coordinates=[];
Object.entries(parsedata).some(([index, content])=>{
    if (index==="keys") return false;
    const x=BigInt(index);
    const base=Number(content.base);
    const decimal=BigInt(parseInt(content.value, base));
    coordinates.push({x,decimal});
    return coordinates.length===reqpoints;
});
 function findconstant(points){
    let res=0n;
    for (let p=0;p<points.length;p++){
        let top=1n;
        let bottom=1n;
        for (let q=0;q<points.length;q++){
            if (p!==q){
                top*=-points[q].x;
                bottom*=(points[p].x-points[q].x);
            }
        }
        res+=(points[p].decimal*top)/bottom;
    }
    return res;
 }
 const constantterm=findconstant(coordinates);
 process.stdout.write(constantterm.toString());