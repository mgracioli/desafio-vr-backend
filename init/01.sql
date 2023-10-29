DROP TABLE IF EXISTS produto;

CREATE TABLE produto (
	id serial4 NOT null,
	descricao varchar(60) NOT NULL,
	custo numeric(13, 3),
	imagem _bytea,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS loja;

CREATE TABLE loja (
	id serial4 NOT NULL,
	descricao varchar(60),
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS produtoloja;

CREATE TABLE produtoloja (
 id serial4 NOT NULL,
 id_produto int NOT NULL,
 id_loja int NOT NULL,
 preco_venda numeric(13,3),
 PRIMARY KEY (id),
 FOREIGN KEY (id_produto) REFERENCES produto (id) on delete CASCADE,
 FOREIGN KEY (id_loja) REFERENCES loja (id) on delete CASCADE
);

INSERT INTO loja (descricao) 
VALUES 	('Matriz'), 
			 	('Filial 1'), 
				('Filial 2'), 
				('Filial 3'), 
				('Filial 4'), 
				('Filial 5');