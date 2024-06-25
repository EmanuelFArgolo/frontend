import React, { useState } from 'react';
import './AlbumPartilha.css'; 
import CreatePublicationButton from '../../componentes/botao_view_publicacoes/criar_publicacao';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPen, FaTrashAlt, FaInfoCircle, FaBan } from 'react-icons/fa';
import Modal from 'react-modal';

const AlbumPartilha = () => {
  const [publicacoes, setPublicacoes] = useState([
    {
      id: 1,
      nome: 'Estado Municipal do Fontelo',
      topico: 'Futebol',
      dataCriacao: '2024-06-12T10:00:00Z',
      status: 'inactive',
      imagens: [
        'https://via.placeholder.com/300.png', 
        'https://via.placeholder.com/300x200.png',
      ],
      descricao: 'Descrição do evento 1',
      dimensoes: '105x66 metros',
      horario: '8:30-19:00'
    },
    {
      id: 2,
      nome: 'Estádio dos trabelos',
      topico: 'Futebol',
      dataCriacao: '2024-06-12T12:30:00Z',
      status: 'active',
      imagens: [
        'https://eventmundi.com.br/wp-content/uploads/2023/06/Dunny_an_aerial_view_of_the_maracan_stadium_at_sunrise_with_chr_1e100a80-e25f-4049-82fd-a5dff1bb2357.jpg'
        ,
        'https://s3.static.brasilescola.uol.com.br/img/2019/12/estadio-maracana-novo.jpg',
        'https://s3.static.brasilescola.uol.com.br/img/2019/12/estadio-maracana-novo.jpg',

        'https://s3.static.brasilescola.uol.com.br/img/2019/12/estadio-maracana-novo.jpg',

      
      ],
      descricao: 'Descrição do evento 2',
      dimensoes: '100x60 metros',
      horario: '8:30-19:00'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPublicationList, setShowPublicationList] = useState(true);
  const [selectedButton, setSelectedButton] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  const [nome, setNome] = useState('');
  const [topico, setTopico] = useState('');
  const [imagem, setImagem] = useState('default-image-url');

  const [editandoPublicacao, setEditandoPublicacao] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [publicacaoIdParaExcluir, setPublicacaoIdParaExcluir] = useState(null);

  const [detalhesModalIsOpen, setDetalhesModalIsOpen] = useState(false);
  const [publicacaoDetalhada, setPublicacaoDetalhada] = useState(null);

  const openDetalhesModal = (publicacao) => {
    setPublicacaoDetalhada(publicacao);
    setDetalhesModalIsOpen(true);
  }

  const closeDetalhesModal = () => {
    setDetalhesModalIsOpen(false);
    setPublicacaoDetalhada(null);
  }

  const openModal = (publicacaoId) => {
    setIsOpen(true);
    setPublicacaoIdParaExcluir(publicacaoId);
  }

  const closeModal = () => {
    setIsOpen(false);
    setPublicacaoIdParaExcluir(null);
  }

  const handleDeleteClick = (publicacaoId) => {
    openModal(publicacaoId);
  };

  const handleConfirmDelete = async () => {
    if (publicacaoIdParaExcluir) {
      try {
        console.log(`Publicação ${publicacaoIdParaExcluir} excluída com sucesso.`);
        setPublicacoes(prevPublicacoes => prevPublicacoes.filter(publicacao => publicacao.id !== publicacaoIdParaExcluir));
      } catch (error) {
        console.error('Erro ao excluir publicação:', error);
      } finally {
        closeModal(); 
      }
    }
  };

  const handleCreatePublicationClick = () => {
    setShowCreateForm(true);
    setShowPublicationList(false);
    setSelectedButton('create');
    setEditandoPublicacao(null);
    resetForm();
  };

  const handleShowPublicationListClick = () => {
    setShowCreateForm(false);
    setShowPublicationList(true);
    setSelectedButton('list');
  };

  const resetForm = () => {
    setNome('');
    setTopico('');
    setImagem('default-image-url');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nome || !topico) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      if (editandoPublicacao) {
        const publicacoesAtualizadas = publicacoes.map(publicacao => 
          publicacao.id === editandoPublicacao.id ? { ...publicacao, nome, topico, imagem } : publicacao
        );
        setPublicacoes(publicacoesAtualizadas);
        console.log('Publicação atualizada com sucesso.');
      } else {
        const novaPublicacao = {
          id: publicacoes.length + 1,
          nome,
          topico,
          dataCriacao: new Date().toISOString(),
          status: 'active',
          imagens: [imagem]
        };
        setPublicacoes([...publicacoes, novaPublicacao]);
        console.log('Publicação criada com sucesso.');
      }
      setShowCreateForm(false);
      setShowPublicationList(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao criar/atualizar publicação:', error);
      alert('Erro ao criar/atualizar publicação.');
    }
  };

  const handleEditClick = (publicacao) => {
    setShowCreateForm(true);
    setShowPublicationList(false);
    setSelectedButton('edit');
    setEditandoPublicacao(publicacao);
    setNome(publicacao.nome);
    setTopico(publicacao.topico);
    setImagem(publicacao.imagens[0] || 'default-image-url');
  };

  const filterPublicationsByStatus = (status) => {
    switch (status) {
      case 'active':
        return publicacoes.filter(publicacao => publicacao.status === 'active');
      case 'reported':
        return publicacoes.filter(publicacao => publicacao.status === 'reported');
      case 'inactive':
        return publicacoes.filter(publicacao => publicacao.status === 'inactive');
      default:
        return publicacoes;
    }
  };

  const renderPublications = (filteredPublications) => (
    <table className="publications-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome da Publicação</th>
          <th>Tópico</th>
          <th>Data de Criação</th>
          <th>Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {filteredPublications.map((publicacao, index) => (
          <tr key={publicacao.id}>
            <td>{index + 1}</td>
            <td>{publicacao.nome}</td>
            <td>{publicacao.topico}</td>
            <td>{formatarData(publicacao.dataCriacao)}</td>
            <td>
              <span className={`status-badge ${publicacao.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                {publicacao.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td>
              <FaInfoCircle className="info-icon" onClick={() => openDetalhesModal(publicacao)} />
              <FaBan className="ban-icon" />
              <FaPen className="edit-icon" onClick={() => handleEditClick(publicacao)} />
              <FaTrashAlt className="delete-icon" onClick={() => handleDeleteClick(publicacao.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const filteredPublications = filterPublicationsByStatus(selectedButton).filter(publicacao =>
    publicacao.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="div_princ">
      <h1 className="title2">Lista de Publicações</h1>
      <div className="button-container">
        <CreatePublicationButton
          onClick={handleShowPublicationListClick}
          iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
          iconBgColor="#e0f7fa"
          title="Publicações Totais"
          subtitle={publicacoes.length.toString()}
          isSelected={selectedButton === 'list'}
        />
        <CreatePublicationButton
          iconSrc="https://i.ibb.co.png"
          iconBgColor="#FFE0EB"
          title="Ativas"
          subtitle={filterPublicationsByStatus('active').length.toString()}
          isSelected={selectedButton === 'active'}
          onClick={() => setSelectedButton('active')}
        />
         <CreatePublicationButton
          iconSrc="https://i.ibb.co.png"
          iconBgColor="#FFE0EB"
          title="Inativas"
          subtitle={filterPublicationsByStatus('inactive').length.toString()}
          isSelected={selectedButton === 'inactive'}
          onClick={() => setSelectedButton('inactive')}
        />
        <CreatePublicationButton
          iconSrc="https://i.ibb.co/RPC7vW8.png"
          iconBgColor="#FFE0EB"
          title="Denunciadas"
          subtitle={filterPublicationsByStatus('reported').length.toString()}
          isSelected={selectedButton === 'reported'}
          onClick={() => setSelectedButton('reported')}
        />
        <CreatePublicationButton
          onClick={handleCreatePublicationClick}
          iconSrc="https://i.ibb.co/P4nsk4w/Icon-criar.png"
          iconBgColor="#e0f7fa"
          title="Criar Publicação"
          subtitle="Criar..."
          isSelected={selectedButton === 'create'}
        />
      </div>

      <div className="search-bar">
        <FaMagnifyingGlass className="search-icon" />
        <input
          type="text"
          placeholder="Procurar por Publicação..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showCreateForm && (
        <div className="form-container">
          <h2>{editandoPublicacao ? 'Editar Publicação' : 'Criar Publicação'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-left">
              <label>
                Nome:
                <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </label>
              <label>
                Tópico:
                <input type="text" name="topico" value={topico} onChange={(e) => setTopico(e.target.value)} />
              </label>
              <label>
                Imagem:
                <input type="text" name="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
              </label>
            </div>
            <button type="submit">{editandoPublicacao ? 'Atualizar' : 'Criar'}</button>
          </form>
        </div>
      )}

      {showPublicationList && (
        <div className="publications-view">
          {publicacoes.length === 0 ? (
            <div className='empty-message'>Nenhuma publicação disponível.</div>
          ) : (
            renderPublications(filteredPublications)
          )}
        </div>
      )}

      {/* Modal para confirmar exclusão */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Eliminar Partilha"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <div className="modal-icon">
            <FaTrashAlt /> 
          </div>
          <h2>Eliminar partilha?</h2>
          <p>O user que criou esta partilha será notificado sobre sua ação</p>
          <div className="modal-buttons">
            <button onClick={handleConfirmDelete}>Eliminar</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Modal
  isOpen={detalhesModalIsOpen}
  onRequestClose={closeDetalhesModal}
  contentLabel="Detalhes da Publicação"
  className="modal-detalhes"
  overlayClassName="overlay-detalhes"
>
  {publicacaoDetalhada && (
    <div className="modal-detalhes-content">
      <h2>{publicacaoDetalhada.nome}</h2>
      <div className="galeria">
        {publicacaoDetalhada.imagens.map((imagem, index) => (
          <img
            key={index}
            src={imagem}
            alt={`Imagem ${index + 1}`}
            className="publicacao-detalhes-imagem"
          />
        ))}
      </div>
      <div className="descricao">
        <p><strong>Descrição do Local:</strong> {publicacaoDetalhada.descricao}</p>
        <br></br>
        <p><strong>Horário:</strong> {publicacaoDetalhada.horario}</p>
      </div>
      <div className="modal-detalhes-buttons">
        <button onClick={closeDetalhesModal}>Fechar</button>
      </div>
    </div>
  )}
</Modal>

    </div>
  );
};

export default AlbumPartilha;
