brands = ["Toyota","Bud Light","Hyundai","Coca-Cola","Doritos","Kia","Budweiser","NFL","Pepsi","E-Trade"];

funny = 0 ,show_product_quickly = 0, patriotic = 0,celebrity=0 ,danger = 0,animals=0, use_sex = 0;

for (let row of table){
    if (row["funny"] == "TRUE")
        funny = 1 + funny;
    if (row["show_product_quickly"] == "TRUE")
        show_product_quickly = 1 + show_product_quickly;
    if (row["patriotic"] == "TRUE")
        patriotic = 1 + patriotic;
    if (row["celebrity"] == "TRUE")
        celebrity = 1 + celebrity;
    if (row["danger"] == "TRUE")
        danger = 1 + danger;
    if (row["animals"] == "TRUE")
        animals = 1 + animals;
    if (row["use_sex"] == "TRUE")
        use_sex = 1 + use_sex;

    if (row.view_count == "NA"){
        continue;
    }
}

x = [funny ,show_product_quickly, patriotic ,celebrity,danger,animals, use_sex] ;
y =  ["funny" ,"show_product_quickly" , "patriotic" ,"celebrity","danger","animals", "use_sex"] ;



//-----------------------

brandsTotalLikes = [];
brandsTotalDislikes = [];
brandsTotalViews = [];
classes = [];
function brandDetails(functionality){
    for (i in brands){
        likes = 0;
        dislikes = 0;
        views = 0;
        funny = 0 ,show_product_quickly = 0, patriotic = 0,celebrity=0 ,danger = 0,animals=0, use_sex = 0;
        for (key in table){
            if (brands[i]==table[key]["brand"]){
                if (functionality == "like_count"){
                    if (table[key]["like_count"] == "NA"){
                        continue;
                    }
                likes = table[key]["like_count"] + likes;
                //console.log(`${key} : ${table[key]["brand"]}`);
                }else if(functionality == "dislike_count"){
                    if (table[key]["dislike_count"] == "NA"){
                    continue;
                    }
                    dislikes = table[key]["dislike_count"] + dislikes;
                }else if(functionality == "view_count"){
                    if (table[key]["view_count"] == "NA"){
                    continue;
                    }
                    views = table[key]["view_count"] + views;

                }else if(functionality == "classes"){
                    if (table[key]["funny"] == "TRUE")
                    funny = 1 + funny;
                    if (table[key]["show_product_quickly"] == "TRUE")
                    show_product_quickly = 1 + show_product_quickly;
                    if (table[key]["patriotic"] == "TRUE")
                    patriotic = 1 + patriotic;
                    if (table[key]["celebrity"] == "TRUE")
                    celebrity = 1 + celebrity;
                    if (table[key]["danger"] == "TRUE")
                    danger = 1 + danger;
                    if (table[key]["animals"] == "TRUE")
                    animals = 1 + animals;
                    if (table[key]["use_sex"] == "TRUE")
                    use_sex = 1 + use_sex;
                }
            }
        }
        if (functionality == "like_count" ) brandsTotalLikes.push({"brand":`${brands[i]}`,"likes":`${likes}`});
        if (functionality == "dislike_count" ) brandsTotalDislikes.push({"brand":`${brands[i]}`,"dislikes":`${dislikes}`});
        if (functionality == "view_count" ) brandsTotalViews.push({"brand":`${brands[i]}`,"views":`${views}`});
        if (functionality == "classes" ) classes.push({"brand":`${brands[i]}`,"funny":`${funny}`,"show_product_quickly":`${show_product_quickly}`,"patriotic":`${patriotic}`,"celebrity":`${celebrity}`,"danger":`${danger}`,"animals":`${animals}`,"use_sex":`${use_sex}`});
    }
    if (functionality == "like_count" ) return brandsTotalLikes;
    if (functionality == "dislike_count" ) return brandsTotalDislikes;
    if (functionality == "view_count" ) return brandsTotalViews;
    if (functionality == "classes" ) return classes;
}


l = brandDetails("like_count");
d = brandDetails("dislike_count");
v = brandDetails("view_count");
c = brandDetails("classes");

console.log(l);
console.log(d);
console.log(v);
console.log(brands);

likesPer1000 = []
dislikesPer1000 = []

for (var i=0; i<10 ; i++){
    likesPer1000.push(l[i]["likes"]*1000/v[i]["views"]);
    dislikesPer1000.push(d[i]["dislikes"]*1000/v[i]["views"]);
}
console.log(likesPer1000);
console.log(dislikesPer1000);



//--


likesPercentageOnBrand =[];
totalLikesOnBrand = 0;
for (i in v){
    totalLikesOnBrand = Number(l[i]["likes"]) + totalLikesOnBrand;
}
for(i in v){
    likesPercentageOnBrand.push(Number(l[i]["likes"]) * 100 / totalLikesOnBrand); 
}


classesList = ["funny","show_product_quickly","patriotic","celebrity","danger","animals","use_sex"];
brandsClassesCounts = [];


for (i in brands){
    brandsClassesCounts.push([
    Number(c[i]["funny"]),
    Number(c[i]["show_product_quickly"]),
    Number(c[i]["patriotic"]),
    Number(c[i]["celebrity"]),
    Number(c[i]["danger"]),
    Number(c[i]["animals"]),
    Number(c[i]["use_sex"])]);
}
