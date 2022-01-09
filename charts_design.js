
// usedCategories - bar chart
// how many vids have been using each categories
// so we can say which category is the most used one and so we can show further on that which succeed brand used which one of them

let usedCategories = new Chart('usedCategories', {
    type: 'bar',
    data: {
        labels: y,
        datasets: [{
        label: 'total categories used',
        data: x,
        backgroundColor: ["#E09873"],
        datalabels:{
            color:"#000",
            anchor:"end",
            align:'bottom',
            offset:4,
            backgroundColor: "ivory",
            borderRadius: 4,
            //formatter: Math.round,
            padding:5
        }
        //https://chartjs-plugin-datalabels.netlify.app/guide/options.html
        }]
    },
    plugins:[ChartDataLabels],
    options: {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display:false
                },
            },
            y: {
                grid: {
                    display:false,
                    borderWidth: 0,
                    //lineWidth:0
                },
                ticks:{
                    display:false,
                }
            }
        },
        animation: {
        },
        plugins: {
            legend: {
                display:false
            },
            title: {
            },
            tooltip: {
                enabled:false
            }
          
        }
    }
    });




// bar charts
// how many likes - views and dislikes for each brand
// so we can guess which brand had the ost views and likes to say if its vids did a good job or not


let likeschart = new Chart('likes-dislikes-chart', {
    data: {
        datasets: [{
            type: 'bar',
            label: 'Likes',
            data: likesPer1000,
            backgroundColor:"#aed1d6",
            datalabels:{
                color:"#000",
                anchor:"end",
                align:'top',
                offset:4,
                backgroundColor: "ivory",
                borderRadius: 4,
                formatter: Math.ceil    ,
                padding:5
            }
        }, {
            type: 'bar',
            label: 'Dislikes',
            data: dislikesPer1000,
            backgroundColor:"#314570",
            datalabels:{
                color:"#000",
                anchor:"end",
                align:'top',
                offset:4,
                backgroundColor: "ivory",
                borderRadius: 4,
                formatter: Math.ceil,
                padding:5
            }
        }],
        labels: brands
    },
    plugins:[ChartDataLabels],
    options: {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
        x: {
            grid: {
                display:false
            },
            ticks: {
            },
            title: {
            }
        },
        y: {
            grid: {
                display:true,
                borderWidth: 0,
            },
            ticks: {
                display:false
            },
            title: {
            }
        }
        },
        animation: {
        },
        plugins: {
            legend: {
            },
            title: {
            },
            tooltip: {
            }
        }
    }
    });


// pie chart and radar init
// so i can show how many likes did each brand has
// each brand and associated number of each categories they used

var rc = null;
var ctx = document.getElementById('views-pie-chart');
var aaa = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: brands,
        datasets: [{
            label: brands,
            data: likesPercentageOnBrand,
            backgroundColor: ["#ffbaa1", "#ff7e4f","#ff4400","#cc572d","#cc7556","#bf9586","#7d5b4f", "#7a351c","#38180c","#332b28"],
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            
        },
        plugins:{
            legend:{
                position:'left',
            }
            
        },
    onClick:function clickHandler(evt) {
        function callradarchart(classesList,classes){

            var ctx = document.getElementById('radarchart');
                    var radarchart = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: classesList,
                            datasets: [{
                                label: 'radar classes',
                                data: classes,
                                fill: true,
                                backgroundColor: 'rgba(224, 152, 115, 0.2)',
                                borderColor: '#5e321b',
                                pointBackgroundColor: 'rgb(255, 99, 132)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(255, 99, 132)'
                            }]
                        },
                        options: {
                            responsive:true,
                            maintainAspectRatio: false,
                            scales: {
                               
                            },
                            plugins:{
                                legend:{
                                    display:false
                                }
                                
                            },
                        }
                        
                        
                        
                        });
        
                        return radarchart;
        }
        
        const points = aaa.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        //console.log(points);
        if (points.length) {
            const firstPoint = points[0];
            //console.log(firstPoint);
            var label = aaa.data.labels[firstPoint.index];
            var value = aaa.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];




            
            let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + 
              label + '?redirect=true';
            //let url2 = 'https://en.wikipedia.org/api/rest_v1/page/media-list/' + label + '?redirect=true';
      
      
            fetch(url).then(response => response.json()).then(json => {
              console.log(json.extract_html);
              document.querySelector('.brand-desc').innerHTML = json.description;
              //fetch(url2).then(response => response.json()).then(json => {
                //document.querySelector('#brand-logo').src = "http:" + json.items[0].srcset[0].src;
              //console.log(json.items[0].srcset[0].src);
            //});
            });






            //var myobj = document.getElementById("demo");
            //myobj.remove();

            //console.log("class list:",classesList);
            //console.log("branch index",brandsClassesCounts[firstPoint.index]);

            if(rc !== null){
                rc.destroy();
                rc = null;
            }
            if (rc === null){
                rc = callradarchart(classesList,brandsClassesCounts[firstPoint.index]);
            }
                
                
            
            

            //console.log(label,value);
        }
    }
    }
    
    
        
    
    });

