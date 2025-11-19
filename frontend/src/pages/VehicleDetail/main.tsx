import { useParams } from 'react-router-dom';
import { useVehicleDetail } from '@/domain/vehicle/hooks/useVehicleDetail';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { ArrowLeft, Share2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { VehicleCard } from '@/domain/vehicle/components/VehicleCard';
import { ContactForm } from '@/domain/contact/components/ContactForm';

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, isError, error } = useVehicleDetail(id!);
  const { goBack, navigate } = useNavigation();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatKm = (km: number) => {
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupItemsByCategory = (items: Array<{ descricao: string; categoria: string }>) => {
    return items?.reduce((acc, item) => {
      if (!acc[item.categoria]) {
        acc[item.categoria] = [];
      }
      acc[item.categoria].push(item.descricao);
      return acc;
    }, {} as Record<string, string[]>);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: vehicle?.tituloAnuncio,
          text: `Confira este veículo: ${vehicle?.tituloAnuncio}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError || !vehicle) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-destructive">Erro ao carregar veículo</h2>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : 'Veículo não encontrado'}
        </p>
        <Button onClick={goBack}>Voltar</Button>
      </div>
    );
  }

  const itemsSerie = groupItemsByCategory(vehicle.itensSerie);
  const opcionais = vehicle.opcionais ? groupItemsByCategory(vehicle.opcionais) : {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
            <div className="relative aspect-video w-full bg-muted">
              <img
                src={vehicle.fotos[selectedPhoto]?.url || vehicle.fotoPrincipal}
                alt={vehicle.tituloAnuncio}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-6 gap-2 p-4">
              {vehicle.fotos?.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className={`aspect-video overflow-hidden rounded-md border-2 transition-all ${
                    selectedPhoto === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.legenda || `Foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{vehicle.tituloAnuncio}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Status: <span className="font-medium">{vehicle.statusVeiculo}</span>
                </p>
              </div>
            </div>
            <div className="text-4xl font-bold text-primary-600">{formatPrice(vehicle.preco)}</div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Especificações Técnicas</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Marca</span>
                <p className="font-medium">{vehicle.especificacoes.marca}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Modelo</span>
                <p className="font-medium">{vehicle.especificacoes.modelo}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Ano Fabricação/Modelo</span>
                <p className="font-medium">
                  {vehicle.especificacoes.anoFabricacao}/{vehicle.especificacoes.anoModelo}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Quilometragem</span>
                <p className="font-medium">{formatKm(vehicle.especificacoes.quilometragem)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Combustível</span>
                <p className="font-medium">{vehicle.especificacoes.combustivel}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Câmbio</span>
                <p className="font-medium">{vehicle.especificacoes.cambio}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Potência</span>
                <p className="font-medium">{vehicle.especificacoes.potencia}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Cor</span>
                <p className="font-medium">{vehicle.especificacoes.cor}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Portas</span>
                <p className="font-medium">{vehicle.especificacoes.portas}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Carroceria</span>
                <p className="font-medium">{vehicle.especificacoes.carroceria}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Motor</span>
                <p className="font-medium">{vehicle.especificacoes.motor}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Final da Placa</span>
                <p className="font-medium">{vehicle.especificacoes.finalPlaca}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Itens de Série</h2>
          <div className="space-y-4">
            {Object.entries(itemsSerie || {}).map(([category, items]) => (
              <div key={category} className="border-b pb-4 last:border-b-0">
                <button
                  onClick={() => toggleCategory(category)}
                  className="mb-2 flex w-full items-center justify-between text-left font-medium"
                >
                  {category}
                  <span className="text-sm text-muted-foreground">({items.length})</span>
                </button>
                <ul
                  className={`grid gap-2 text-sm ${
                    expandedCategories[category] || items.length <= 10
                      ? 'grid-cols-1'
                      : 'grid-cols-1'
                  }`}
                >
                  {(expandedCategories[category] ? items : items.slice(0, 10)).map(
                    (item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
                {items.length > 10 && (
                  <button
                    onClick={() => toggleCategory(category)}
                    className="mt-2 text-sm text-primary-600 hover:underline"
                  >
                    {expandedCategories[category] ? 'Ver menos' : `Ver mais (${items.length - 10})`}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {Object.keys(opcionais).length > 0 && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Opcionais</h2>
            <div className="space-y-4">
              {Object.entries(opcionais).map(([category, items]) => (
                <div key={category} className="border-b pb-4 last:border-b-0">
                  <button
                    onClick={() => toggleCategory(`opcional-${category}`)}
                    className="mb-2 flex w-full items-center justify-between text-left font-medium"
                  >
                    {category}
                    <span className="text-sm text-muted-foreground">({items.length})</span>
                  </button>
                  <ul
                    className={`grid gap-2 text-sm ${
                      expandedCategories[`opcional-${category}`] || items.length <= 10
                        ? 'grid-cols-1'
                        : 'grid-cols-1'
                    }`}
                  >
                    {(expandedCategories[`opcional-${category}`] ? items : items.slice(0, 10)).map(
                      (item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                  {items.length > 10 && (
                    <button
                      onClick={() => toggleCategory(`opcional-${category}`)}
                      className="mt-2 text-sm text-primary-600 hover:underline"
                    >
                      {expandedCategories[`opcional-${category}`]
                        ? 'Ver menos'
                        : `Ver mais (${items.length - 10})`}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Histórico do Veículo</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-sm text-muted-foreground">Procedência</span>
            <p className="font-medium">{vehicle.historico.procedencia}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Proprietários</span>
            <p className="font-medium">{vehicle.historico.proprietarios}</p>
          </div>
          {vehicle.historico.garantia && (
            <div>
              <span className="text-sm text-muted-foreground">Garantia</span>
              <p className="font-medium">{vehicle.historico.garantia}</p>
            </div>
          )}
        </div>

        {vehicle.historico.revisoes && vehicle.historico.revisoes.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 font-semibold">Revisões</h3>
            <div className="space-y-2">
              {vehicle.historico.revisoes.map((revisao, index) => (
                <div key={index} className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{revisao.data}</span>
                    <span className="text-muted-foreground">{formatKm(revisao.quilometragem)}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{revisao.local}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {vehicle.historico.sinistros && vehicle.historico.sinistros.length > 0 ? (
          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-destructive">Sinistros</h3>
            <div className="space-y-2">
              {vehicle.historico.sinistros.map((sinistro, index) => (
                <div
                  key={index}
                  className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{sinistro.data}</span>
                    <span className="text-muted-foreground">{sinistro.tipo}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{sinistro.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <Check className="h-4 w-4" />
            <span className="font-medium">Sem registro de sinistros</span>
          </div>
        )}

        {vehicle.historico.laudoTecnico && (
          <div className="mt-6">
            <h3 className="mb-3 font-semibold">Laudo Técnico</h3>
            <div className="rounded-md border p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Data da Inspeção</span>
                <span className="font-medium">{vehicle.historico.laudoTecnico.dataInspecao}</span>
              </div>
              <div className="mt-2">
                <span className="text-muted-foreground">Resultado</span>
                <p className="mt-1 font-medium">{vehicle.historico.laudoTecnico.resultadoGeral}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Condições de Venda</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Formas de Pagamento</h3>
            <div className="flex flex-wrap gap-2">
              {vehicle.condicoesVenda.formasPagamento.map((forma) => (
                <span
                  key={forma}
                  className="rounded-full border bg-muted px-3 py-1 text-sm font-medium"
                >
                  {forma}
                </span>
              ))}
            </div>
          </div>

          {vehicle.condicoesVenda.condicoesFinanciamento && (
            <div>
              <h3 className="mb-2 font-medium">Condições de Financiamento</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <span className="text-sm text-muted-foreground">Entrada Mínima</span>
                  <p className="font-medium">
                    {formatPrice(vehicle.condicoesVenda.condicoesFinanciamento.entradaMinima)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Taxa de Juros</span>
                  <p className="font-medium">
                    {vehicle.condicoesVenda.condicoesFinanciamento.taxaJuros}% a.m.
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Prazo Máximo</span>
                  <p className="font-medium">
                    {vehicle.condicoesVenda.condicoesFinanciamento.prazoMaximo} meses
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {vehicle.condicoesVenda.aceitaTroca ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-medium">Aceita troca</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                <span className="font-medium">Não aceita troca</span>
              </>
            )}
          </div>

          {vehicle.condicoesVenda.observacoesVenda && (
            <div>
              <h3 className="mb-2 font-medium">Observações</h3>
              <p className="text-sm text-muted-foreground">
                {vehicle.condicoesVenda.observacoesVenda}
              </p>
            </div>
          )}

          <div>
            <h3 className="mb-2 font-medium">Documentação Necessária</h3>
            <ul className="space-y-2">
              {vehicle.condicoesVenda.documentacaoNecessaria.map((doc, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <div>
                    <span className="font-medium">{doc.nome}</span>
                    {doc.observacoes && <p className="text-muted-foreground">{doc.observacoes}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Situação Documental</h3>
            <div className="rounded-md border p-3">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    vehicle.condicoesVenda.situacaoDocumental.status === 'Regular'
                      ? 'bg-green-100 text-green-800'
                      : vehicle.condicoesVenda.situacaoDocumental.status === 'Pendente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {vehicle.condicoesVenda.situacaoDocumental.status}
                </span>
              </div>
              {vehicle.condicoesVenda.situacaoDocumental.pendencias &&
                vehicle.condicoesVenda.situacaoDocumental.pendencias.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium">Pendências:</span>
                    <ul className="ml-4 mt-1 list-disc text-sm text-muted-foreground">
                      {vehicle.condicoesVenda.situacaoDocumental.pendencias.map(
                        (pendencia, index) => (
                          <li key={index}>{pendencia}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              {vehicle.condicoesVenda.situacaoDocumental.observacoes && (
                <p className="text-sm text-muted-foreground">
                  {vehicle.condicoesVenda.situacaoDocumental.observacoes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ContactForm vehicleId={vehicle.id} vehicleModel={vehicle.tituloAnuncio} />

      {vehicle.veiculosSimilares && vehicle.veiculosSimilares.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Veículos Similares</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicle.veiculosSimilares.map((similar) => (
              <VehicleCard
                key={similar.id}
                vehicle={{
                  id: similar.id,
                  marca: similar.marca,
                  modelo: similar.modelo,
                  ano: similar.ano,
                  preco: similar.preco,
                  imagemPrincipal: similar.imagemPrincipal,
                  quilometragem: similar.quilometragem,
                  cambio: similar.cambio,
                }}
                onClick={() => navigate(`/vehicle/${similar.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
