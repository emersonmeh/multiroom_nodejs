module.exports.iniciaChat = function(application, req, res) {

    //modulo body-parser responsável por preencher o campo body da request. No html(ejs) é necessário que o form
    // possua o campo 'name' declarado, caso contrário o body irá retornar um obj vazio.
    var dadosForm = req.body; 
    //console.log(dadosForm);

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var errors = req.validationErrors();
    console.log('Erros: ', errors);
    if(errors){
        res.render('index', {validacao : errors});
        return; //importante utilizar return sempre que for finalizar o processo.
    }

    application.get('io').emit(
        'msgCliente',
        {
            apelido: dadosForm.apelido, 
            mensagem: ' acabou de entrar no chat!'
        }
    );

    res.render('chat', {dadosForm: dadosForm});
}