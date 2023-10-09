import '../css/form.css'


function Tabs () {

    return (

        <ul class="nav nav-tabs text-center mt-3 ms-2 justify-content-center" id="myTab" role="tablist" th:fragment="tabsInfos">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="contatos-tab" data-bs-toggle="tab"
                data-bs-target="#contatos" type="button" role="tab" aria-controls="home"
                aria-selected="true">Contatos
        </button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="setorizacao-tab" data-bs-toggle="tab"
                data-bs-target="#setorizacao" type="button" role="tab" aria-controls="profile"
                aria-selected="false">Setorização
        </button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="viagens-tab" data-bs-toggle="tab" data-bs-target="#viagens"
                type="button" role="tab" aria-controls="contact" aria-selected="false">Viagens
        </button>
    </li>

</ul>

    )

}

export default Tabs