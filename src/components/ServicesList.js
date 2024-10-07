import {fetchServices} from "../store/storeServices";
import {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const ServicesList = props => {
  useEffect(() => {
    props.fetch()
  }, []);

  if (props.error) {
    return (
      <>
        Произошла ошибка!
        <button onClick={() => props.fetch()}>Попробовать еще раз</button>
      </>
    );
  } else {
    if (props.loading) {
      return <div className="preloader"></div>;
    } else {
      const services = props.services;

      return services.map(i => <div key={i.id}><Link className="services__item" to={`/${i.id}/details`}>{i.name} - цена: {i.price}</Link></div> );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: () => dispatch(fetchServices())
  }
}

const mapStateToProps = (state) => state.servicesState;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesList);