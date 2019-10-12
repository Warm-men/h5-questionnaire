import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

const PageHelmet = ({ title, link }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={link} />
    </Helmet>
  )
}
PageHelmet.defaultProps = {
  link: window.location.pathname
}

PageHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default React.memo(PageHelmet)
