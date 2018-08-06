// var logoutTimer = setTimeout(function () { localStorage.clear(); }, (60 * 60 * 1000));//Cache for 24h

$(document).ready(function () {
    list_projects();
});

function get_projects() {
    // let url = 'http://localhost:3000/api/portfolio'
    let url = ' https://nim-wijetunga.lib.id/profilePost@0.1.4/';
    let project_names = {
        "Crypto-Consensus": "Crypto-Consensus",
        "Infinity": "Infinity",
        "StudySpace": "Study Space",
        "PresentEasy": "PresentEasy"
    }
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(project_names),
            dataType: 'json',
            success: function (projects) {
                if (!projects) reject(false);
                projects = JSON.parse(JSON.stringify(projects));
                if (projects['data']) resolve(projects);
                else reject(false);
            },
            error: function (err) {
                reject(false);
            },
            processData: false,
            type: 'POST',
            url: url
        });
    })
}

async function list_projects() {
    localStorage.clear();
    var projects = JSON.parse(localStorage.getItem('projects'));

    if (!projects) {

        projects = await get_projects().catch(function (err) { return false; });
        if (!projects || !projects['projects']) return;

        //Add classes
        
        var class2 = ['c1', 'c2'];
        var class3 = ['top', 'top', 'bottom', 'bottom']
        for (var i in projects['projects']) {
            projects['projects'][i]['img'] = '../' + projects['projects'][i]['img'];
            let id_str = class2[i % 2] + "-" + class3[i];
            projects['projects'][i]['id'] = id_str;
        }

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    var template, html;

    $(".container").hide();
    template = $('#template').val();
    html = Mustache.render(template, projects);
    $('#result').html(html);
}