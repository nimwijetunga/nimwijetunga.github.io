$(document).ready(function(){
    list_projects();
});

function get_projects(){
    let url = 'https://nim-wijetunga.lib.id/get-profile-data@0.0.0/';
    return new Promise(function (resolve, reject) {
        $.get(url, function(projects) {
            $( ".container" ).hide();
            if(!projects) reject(false);
            projects = JSON.parse(JSON.stringify(projects));
            if(projects['data']) resolve(projects);
            else reject(false);
        });
    })
}

async function list_projects(){
    var projects = await get_projects().catch(function(err){return false;});
    if(!projects || !projects['projects'])return;
    var template, data, html;

    //Add classes
    var class2 = ['c1', 'c2'];
    var class3 = ['top','top','bottom', 'bottom']
    for(var i in projects['projects']){
        let id_str =  class2[i % 2] + "-" + class3[i];
        projects['projects'][i]['id'] = id_str;
    }

    template = $('#template').val();
    html = Mustache.render(template, projects);
    $('#result').html(html);
}