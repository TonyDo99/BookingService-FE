import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
//
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  cursor: 'pointer',
  width: 'fit-content',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'none',
  position: 'absolute',
});

// ----------------------------------------------------------------------

EventsClient.propTypes = {
  event: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function EventsClient({ event, index }) {
  const { _id, slug, name, description, poster, startDate, endDate, ticket } = event;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [{ number: ticket.length || 0, icon: 'eva:share-fill' }];

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Events
      </Typography>
      <Card sx={{ position: 'relative' }}>
        <a href={`/home/events/${_id}/listTickets`}>
          <StyledCardMedia
            sx={{
              ...((latestPostLarge || latestPost) && {
                pt: 'calc(100% * 4 / 3)',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
              ...(latestPostLarge && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            }}
          >
            <SvgColor
              color="paper"
              src="/assets/images/event/event.png"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
                color: 'background.paper',
                ...((latestPostLarge || latestPost) && { display: 'none' }),
              }}
            />
            <StyledAvatar
              alt={name}
              src="/assets/images/event/event.png"
              sx={{
                ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 40,
                }),
              }}
            />

            <StyledCover alt={slug} src="/assets/images/event/event.png" />
          </StyledCardMedia>

          <CardContent
            sx={{
              pt: 4,
              ...((latestPostLarge || latestPost) && {
                bottom: 0,
                width: '100%',
                position: 'absolute',
              }),
            }}
          >
            <div className="flex items-center justify-between">
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'greenyellow', display: 'block', fontSize: '14px' }}
              >
                Start: {fDate(startDate)}
              </Typography>
              <Typography gutterBottom variant="caption" sx={{ color: 'red', fontSize: '14px', display: 'block' }}>
                End: {fDate(endDate)}
              </Typography>
            </div>
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="none"
              sx={{
                ...(latestPostLarge && { typography: 'h5', height: 60 }),
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white',
                }),
              }}
            >
              {poster}
            </StyledTitle>

            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="none"
              sx={{
                ...(latestPostLarge && { typography: 'h6', height: 60 }),
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white',
                }),
              }}
            >
              {description}
            </StyledTitle>

            <StyledInfo>
              {POST_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                    ...((latestPostLarge || latestPost) && {
                      color: 'grey.500',
                    }),
                  }}
                />
              ))}
            </StyledInfo>
          </CardContent>
        </a>
      </Card>
    </Grid>
  );
}
