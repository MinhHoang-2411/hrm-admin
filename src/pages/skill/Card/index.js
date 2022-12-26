import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {Box, Card, CardContent, CardMedia, IconButton, Typography} from '@mui/material';
import {useCheckImage} from 'hooks/useCheckImage';
import IconSkill from '../../../assets/images/icons/skill.png';
import '../../../assets/style/asset.scss';

export default function CardSkill({data, styleCard, handleOpenEdit, handleRemove}) {
  return (
    <Card sx={styleCard}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{flex: '1 0 auto', padding: '20px 0px 20px 20px'}}>
          <Typography component='div' variant='h5' className='two-lines' sx={{marginBottom: '5px'}}>
            {data?.name}
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            <span className='two-lines'>{data?.description}</span>
          </Typography>
        </CardContent>
        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
          <IconButton aria-label='previous' onClick={() => handleRemove(data)}>
            <DeleteFilled style={{fontSize: 18, color: '#ff4d4f'}} />
          </IconButton>
          <IconButton aria-label='next' onClick={() => handleOpenEdit(data?.id)}>
            <EditFilled style={{fontSize: 18, color: '#1890ff'}} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component='img'
        sx={{width: 130, height: 130, padding: '10px', objectFit: 'contain', margin: 'auto 0'}}
        image={useCheckImage(data?.imageUrl, IconSkill)}
        alt='Logo skill'
      />
    </Card>
  );
}
