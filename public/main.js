// file to put the functional app
Vue.component('home-page', {
    template: `<div class="home-page">
                    <div><a class="hp-header">Secure Collab</a></div></br>
                    <div><a class="hp_desc">One stop for Efficient NSA Security Communications</a></div>
                    <div class="cowboy-background"></div>
                </div>`
    }
)
Vue.component('task-page', {
    template: `<div class="task-page">
                    <div id="myDIV" class="header">
                        <h2>Task List</h2></br>
                        <input type="text" id="myInput" class="input" placeholder="New Task...">
                        <span @click="newElement()" class="addBtn">Add</span>
                    </div>
                    <ul id="myUL" class="task-list">
                        <li v-for="items in this.$root.task_items" @click="makeChecked(items)" v-bind:class="{checked: isChecked}">{{ items.task }}</li>
                    </ul>
                </div>`,
    data: function() {
        return { 
            isChecked: false,
        };
    },
    methods: {
        newElement: function() {
            var Task = document.getElementById('myInput').value;
            this.$root.task_items.push({task: Task});
        },
        makeChecked: function(item) {
            console.log(item);
        }
    }
})
Vue.component('assessment-page', {
    template: `<div class="assessment-page">
                    <div class="page-title"><a class="page-title-text">My Modules</a></div>
                    <div class="add-button" @click="addModule()"><img src="add.png"/></div>
                    <ul>
                        <li v-for="item in this.$root.modules"><componenet :is="item"></componenet></li>
                    </ul>
                </div>`,
    methods: {
        addModule: function() {
            this.$root.modules.push(Module);
        }
    }
})
let Module = {
    template: `<div class="module">
                    <div @click="inputTitle()" class="module-title"><input type="text" id="ModuleInput" class="input" placeholder="Title..."></div>
                    </br></br></br></br>
                    <div v-show="showOpen" @click="openModule()" class="open-module">Open Module</div>
                </div>`,
    data: function() {
        return {showOpen: false}
    },
    methods: {
        openModule: function() {
            this.$root.module_page=true;
            this.$root.assessment_job_page=false;
        },
        inputTitle: function() {
            this.showOpen=true;
        }
    }
}
Vue.component('module-page', {
    template: `<div class="module-page">
                    <div class="close-button"><img @click="closePage" src="close2.png"/></div>
                    <div class="title" @click="moduleTitle()"><b>{{ this.Module_title }}</b></div>
                    <div class="search-header">Search Databases</div>
		    <div class="search-bar">
		    	<input type="text" id="SearchText" class="input" placeholder="Query">
			<button type="submit" @click="runSearch()"><i class="fa fa-search"></i> Search</button>
		    </div>
		    <br>
		    <div id="results">
		    	<li class="list-items" v-for="item in this.$root.cards" style="list-style: none;"><a v-bind:href=item.url>{{ item.name }}</a></li>
		    </div>
                </div>
    `,
    data: function() {
        return { Module_title: "Hello" };
    },
    methods: {
        moduleTitle: function() {
            var Title=document.getElementById("ModuleInput").value;
            this.Module_title = Title;
        },
        closePage: function() {
            this.$root.assessment_job_page = true;
            this.$root.module_page = false;
        },
	makeCards: function(data) {
	},
	runSearch: function() {
            var query=document.getElementById("SearchText").value;
	    var response = null;
	    $.ajax({
	        url: 'https://api.datacowboy.ml/search?query='.concat(query),
		async: false,
		dataType: 'json',
		success: function (json) {
		    response = json;
		}
	    });
	    console.log(response);
	    var i = 1;
	    for (hash in response) {
		this.$root.cards.push({name: "Result #".concat(i), url: "https://api.datacowboy.ml/req?hash=".concat(response[hash])});
		i++;
	    }
	}
    }
})
Vue.component('groups-page', {
    template: `<div class="groups-page">

                </div>`
    }
)
Vue.component('alert-page', {
    template: `<div class="alert-page">
                    <div class="alerts-title"><b>Alerts</b><hr></hr></div>
                    <div class="alerts-list">
                        <a>Urgent</a>
                        <ul>
                            <li> &#8226 20-09-19 06:37:43 This</li>
                        </ul>
                    </div>
                    <div class="alerts-list">
                        <a>Collab</a>
                        <ul>
                            <li> &#8226 20-09-16 06:37:43 This1 </li>
                            <li> &#8226 20-07-25 09:23:47 This2 </li>
                            <li> &#8226 20-06-28 10:51:12 This3</li>
                        </ul>
                    </div>
                </div>`,
    data: function() {
        return { showUrgent: false, showCollab: false}
    },
})
Vue.component('nav-bar', {
    template: `<div class="nav-bar">
                    <ul>
                        <li @click="nav_func('home')" v-bind:class="{active: nav_home2}"><a href="#home"><b>Home</b></a></li>
                        <li @click="nav_func('task')" v-bind:class="{active: nav_tasks2}"><a href="#tasks"><b>Tasks</b></a></li>
                        <li @click="nav_func('assessment')" v-bind:class="{active: nav_jobs2}"><a href="#jobs"><b>Job</b></a></li>
                        <li @click="nav_func('groups')" v-bind:class="{active: nav_groups2}"><a href="#groups"><b>Groups</b></a></li>
                        <li @click="nav_func('alert')" v-bind:class="{active: nav_alerts2}"><a href="#alerts"><b>Alerts</b></a></li>
                    </ul>
                </div>`,
    data: function() {
        return {
            nav_home2: true,
            nav_tasks2: false,
            nav_jobs2: false,
            nav_groups2: false,
            nav_alerts2: false,
        }
    },
    methods: {
        nav_func: function(page) {
            if (page == 'home') {return this.$root.home_page=true, this.$root.task_page=false, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=false, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=true,this.nav_tasks2=false,
                                this.nav_jobs2=false,this.nav_groups2=false,this.nav_alerts2=false}
            else if (page == 'task') {return this.$root.home_page=false, this.$root.task_page=true, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=false, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=true,
                                this.nav_jobs2=false,this.nav_groups2=false,this.nav_alerts2=false}
            else if (page == 'assessment') {return this.$root.home_page=false, this.$root.task_page=false, this.$root.assessment_job_page=true, 
                                this.$root.groups_page=false, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=false,
                                this.nav_jobs2=true,this.nav_groups2=false,this.nav_alerts2=false}
            else if (page == 'groups') {return this.$root.home_page=false, this.$root.task_page=false, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=true, this.$root.alert_page=false, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=false,
                                this.nav_jobs2=false,this.nav_groups2=true,this.nav_alerts2=false}
            else if (page == 'alert') {return this.$root.home_page=false, this.$root.task_page=false, this.$root.assessment_job_page=false, 
                                this.$root.groups_page=false, this.$root.alert_page=true, this.$root.module_page=false,
                                this.nav_home2=false,this.nav_tasks2=false,
                                this.nav_jobs2=false,this.nav_groups2=false,this.nav_alerts2=true}
        }
}});




var app = new Vue({
    el: '#app',
    data: {
        home_page: true,
        task_page: false,
        assessment_job_page: false,
        groups_page: false,
        alert_page: false,
        task_items: [
            {task: ''},
        ],
        modules: [

        ],
        module_page: false,
	cards: [
	],
    }
});
