sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
                
                // var dadosGerais = {
                //     nomeCampeonato : "Brasileirao 2023 no Canal FioriNET",
                //     rodada : 99
                // };

                // var dadosModel = new JSONModel();
                // dadosModel.setData(dadosGerais);

                // var tela = this.getView();
                // tela.setModel(dadosModel, "ModeloDadosGerais");

                // Definir objetos novos para campeonato, para classificacao e para partidas
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                // 3 modelos novos
                var dadosModel = new JSONModel();
                var classificacaoModel = new JSONModel();
                var partidasModel = new JSONModel();

                // colocar dados dentro dos modelos
                dadosModel.setData(dadosGerais);
                classificacaoModel.setData(classificacao);
                partidasModel.setData(partidas);

                //atribuir modelos na tela
                var tela = this.getView();
                tela.setModel(dadosModel, "ModeloDadosGerais");
                tela.setModel(classificacaoModel, "ModeloTabela");
                tela.setModel(partidasModel,"ModeloPartidas");

                // chamada da função
                this.onBuscarClassificacao();
                this.onBuscarDadosGerais();

            },

            onBuscarClassificacao: function(){
                var oModeloTabela = this.getView().getModel("ModeloTabela");

                // parametros da api
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async : true,
                    crossDomain: true,
                    headers : {
                        "Authorization" : "Bearer test_cffa222e7b7457652ab53111e184fb"
                    }  
                };

                // chamada da api
                $.ajax(configuracoes).done(
                    function(response){
                        //mudar os dados do model
                        oModeloTabela.setData(
                            // Atribuindo a resposta ao objeto
                            {
                                "Classificacao": response
                            }
                        );
                    }.bind(this)
                )
            },

            onBuscarDadosGerais: function(){
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");

                // parametros da api
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async : true,
                    crossDomain: true,
                    headers : {
                        "Authorization" : "Bearer test_cffa222e7b7457652ab53111e184fb"
                    }  
                };

                // chamada da api
                $.ajax(configuracoes).done(
                    function(response){
                        //mudar os dados do model
                        // oModeloTabela.setData(
                        //     // Atribuindo a resposta ao objeto
                        //     {
                        //         "Classificacao": response
                        //     }
                        // );
                        oModeloDadosGerais.setData(response);
                        var rodadaAtual = oModeloDadosGerais.oData.rodada_atual.rodada; // XD
                        this.onBuscarPartidas(rodadaAtual);

                    }.bind(this)
                )
            },

            onBuscarPartidas: function(rodadaAtual){
                var oModeloPartidas = this.getView().getModel("ModeloPartidas");

                // parametros da api
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                    method : "GET",
                    async : true,
                    crossDomain: true,
                    headers : {
                        "Authorization" : "Bearer test_cffa222e7b7457652ab53111e184fb"
                    }  
                };

                // chamada da api
                $.ajax(configuracoes).done(
                    function(response){
                        //mudar os dados do model
                        // oModeloTabela.setData(
                        //     // Atribuindo a resposta ao objeto
                        //     {
                        //         "Classificacao": response
                        //     }
                        // );
                        oModeloPartidas.setData(response);
                    }.bind(this)
                )
            }
        });
    });
