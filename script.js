var app = new function(){
    this.el = document.getElementById('tarefas');
    this.tarefas=[{'tipo':'Lembrete','titulo':'Remedio','descri':'tomar de 8 em 8 horas'}];

    this.MostrarTodos = function(){
        var data='';
        if(this.tarefas.length>0){
            for(var i=0;i<this.tarefas.length;i++){
                data+='<div class= "flex-column">';
                data+='<div class="d-flex justify-content-between">';
                    data+='<div><button onclick="app.Edit('+i+')" class="bi bi-pencil-square float-left" ></button></div>';
                    data+='<div><button onclick="app.Delete('+i+')" class="ml-auto bi bi-x-circle-fill float-right"></button></div>';
                data+='</div>';
                    if(this.tarefas[i]['tipo']=="Lembrete"){
                        data+='<div class="card text-dark bg-warning  mb-3" style="max-width: 18rem;">';
                    }else  if(this.tarefas[i]['tipo']=="Tarefa"){
                        data+='<div class="card text-dark bg-info mb-3" style="max-width: 18rem;">';
                    }else  if(this.tarefas[i]['tipo']=="Urgente"){
                        data+='<div class="card text-dark bg-danger mb-3" style="max-width: 18rem;">';
                    }
                        data+='<div class="card-header">'+this.tarefas[i]['tipo']+'</div>';
                        data+='<div class="card-body">';
                            data+='<h5 class="card-title">'+this.tarefas[i]['titulo']+'</h5>';
                            data+='<p class="card-text">'+this.tarefas[i]['descri']+'</p>';
                        data+='</div>';
                    data+='</div>';
                  
                data+='</div>';
                data+='<div ><p>&nbsp;&nbsp;</p></div>';
               
            }
        }
        this.Contador(this.tarefas.length);
        return this.el.innerHTML = data;
    };

    this.Add = function(){
        tp = document.getElementById('tipo');
        tl = document.getElementById('titulo');
        ds = document.getElementById('descri');
        var tarefa = {tipo:tp.value, titulo:tl.value, descri:ds.value};
        if(tarefa){
            this.tarefas.push(tarefa);
            this.MostrarTodos();
            this.Save(this.tarefas);
            tl.value ='';
            ds.value='';
        }
    };

    this.Edit = function(item){
        tp = document.getElementById('edit-tipo');
        tl = document.getElementById('edit-titulo');
        ds = document.getElementById('edit-descri');
        tp.value = this.tarefas[item]['tipo'];
        tl.value = this.tarefas[item]['titulo'];
        ds.value = this.tarefas[item]['descri'];
        document.getElementById('edit-box').style.display = 'block';
        self = this;

        document.getElementById('save-edit').onsubmit = function() {
            var tipo = tp.value;
            var titulo = tl.value;
            var descri = ds.value;
            var dado = {tipo:tp.value, titulo:tl.value, descri:ds.value};
            if(dado){
                self.tarefas.splice(item, 1, dado);
                self.MostrarTodos();
                self.Save(self.tarefas);
                CloseInput();
            }
            
           
        }
    };
    
    this.Delete = function(item){
        this.tarefas.splice(item,1)
        this.Save(this.tarefas)
        this.MostrarTodos();
    };

    
    this.Contador = function(data){
        var el = document.getElementById('contador');
        var nome = 'Bilhetes';
        if (data){
            if(data == 1){
                nome = 'Bilhete'
            }
            el.innerHTML = data+' '+nome;
        }
        else{
            el.innerHTML = "Sem "+nome;
        }
    };

    this.Save = function(data){
        
        localStorage.setItem('itens',JSON.stringify(data));
    }

    this.Load = function(){
        var data =  localStorage.getItem('itens');
        if (data!=null){
            this.tarefas =JSON.parse(data);
        }
    }

}
app.Load();
app.MostrarTodos();

function CloseInput(){
    document.getElementById('edit-box').style.display='none';
}